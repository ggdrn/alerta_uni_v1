const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
const AuthToken = db.sequelize.models.auth_token;

const usuarioValidation = require("../utils/models/usuario");
const validateEntrace = require("../utils/validations/index");
// Create and Save a new usuario
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		let usuario = req.body;
		// Validar o array de usuarios

		usuarioValidation.forEach(({ name, rule }) => {
			const error = validateEntrace(name, usuario[name], rule)
			if (error) {
				erros.push(error)
			}
		})

		if (erros.length) {
			return res.status(400).send({
				message: "Não foi possível processar a requisição",
				erros
			});
		}

		// Save usuario in the database
		let registros = {}
		let senhaPlana = usuario.password

		const hashedPassword = await bcrypt.hash(senhaPlana, 10)

		usuario.password = hashedPassword;

		if (usuario.tipo == 1) {
			usuario.tipo_nome = 'Administrador';
		} else if (usuario.tipo == 2) {
			usuario.tipo_nome = 'Pessoa';
		} else {
			return res.status(400).send({
				message: "Tipo de usuário incorreto: Forneça 1 para Administrador ou 2 para Pessoa"
			});
		}

		await Usuario.create(usuario)
			.then(data => {
				registros = data;
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({
					message:
						err.message + " " + err.parent.sqlMessage || "Não foi possível processar a requisição de usuario."
				});
			});
		return res.send({ sucess: "usuario Registradas com sucesso", data: registros })
	} catch (error) {
		console.log(error)
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error: error.message
		});
	}
};

// Retrieve all usuario from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

	usuario.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving usuario.",
				error: err
			});
		});
};

// Find a single usuario with an id
exports.findOne = (req, res) => {

};

// Update a usuario by the id in the request
exports.update = (req, res) => {

};

// Delete a usuario with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all usuarios from the database.
exports.deleteAll = (req, res) => {

};

// Find all published usuarios
exports.findAllPublished = (req, res) => {

};

// Para o usuário realizar login
exports.login = async (req, res) => {
	try {

		let usuario = req.body;
		let condition = usuario?.email ? { email: { [Op.eq]: `${usuario.email}` } } : null;

		const registro = await Usuario.findOne({ where: condition });
		const senhaInseridaPeloUsuario = usuario.password;
		const senhaNoBancoDeDados = registro.password;
		bcrypt.compare(senhaInseridaPeloUsuario, senhaNoBancoDeDados, async (err, result) => {
			if (err) {
				// Trate erros aqui
				res.status(401).send({
					message: "Não foi possível relaizar o login, verifique o email e senha"
				});
			} else if (result) {
				const novoToken = jwt.sign({ userId: registro.uid }, registro.password, { expiresIn: '24h' }); // Token expira em 24 horas
				// Tente encontrar um registro com base no usuarioUid, caso não existem crie
				const [authTokenRegistro, isCreated] = await AuthToken.findOrCreate(
					{
						where: { usuarioUid: registro.uid },
						defaults: { token: novoToken },
					}
				);
				// Se o registro existe, atualize o token
				if (!isCreated) {
					authTokenRegistro.token = novoToken;
					await authTokenRegistro.save();
					return res.send({ message: "Usuário Logado com sucesso", token: authTokenRegistro.token });

				} else {
					return res.send({ message: "Usuário Logado com sucesso", token: authTokenRegistro.token });
				}

			} else {
				res.status(401).send({
					message: "Não foi possível relaizar o login, verifique o email e senha"
				});
			}
		});
	} catch (error) {
		console.log(error)
		res.status(401).send({
			message: "Não foi possível relaizar o login, verifique o email e senha"
		});
	}
};

// Para o usuário realizar logout
exports.logout = async (req, res) => {
	try {
		// Vamos verificar o token na requisição
		const token = req.header('Authorization');
		if (!token) {
			return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
		}
		// Tente encontrar um registro com base no token
		const registro = await AuthToken.findOne({ where: { token: token } });
		if (registro) {
			// Se o registro existe, delete-o
			await registro.destroy();
			// Indica que o registro foi deletado com sucesso
			return res.send({ message: "Usuário Deslogado com sucesso" });;
		} else {
			// Indica que o registro não foi encontrado
			res.status(404).send({
				message: "Registro não encontrado"
			});
		}
	} catch (error) {
		res.status(500).send({
			message: "Não foi possível relaizar logout"
		});
	}
};