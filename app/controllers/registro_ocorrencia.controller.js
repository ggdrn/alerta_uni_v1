const db = require("../models");
const deepUpdate = require("sequelize-deep-update");
const RegistroOcorrencia = db.registro_ocorrencia;
const Op = db.Sequelize.Op;

const registroOcorrenciaValidation = require("../utils/models/registro_ocorrencia");
const validateEntrace = require("../utils/validations/index")
// Create and Save a new registro_ocorrencia
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		let data = req.body;
		// Validar o array de Ocorrencias
		registroOcorrenciaValidation.forEach(({ name, rule }) => {
			const error = validateEntrace(name, data[name], rule)
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

		// Save registros in the database
		let registros = {}

		data.status = "Aberta";

		RegistroOcorrencia.beforeCreate(async (registro, options) => {
			const ultimoProtocolo = await RegistroOcorrencia.max('protocolo');
			console.log(ultimoProtocolo);
			const protocolo = ultimoProtocolo ? "aup000" + (parseFloat(ultimoProtocolo.match(/\d+/)) + 1) : "aup000" + 1;
			registro.protocolo = protocolo;
		});

		await RegistroOcorrencia.create(data)
			.then(data => {
				registros = data;
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Não foi possível processar a requisição de Registro Ocorrência."
				});
			});
		return res.send({ sucess: "Ocorrencia Registrada com sucesso", data: registros })
	} catch (error) {
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error
		});
	}
};


// Retrieve all registro_ocorrencia from the database.
exports.findAll = (req, res) => {
	try {
		const { perPage = 20, page = 1 } = req.query;
		const { nome, uid, pessoa_uid, status, protocolo, data_ocorrencia, natureza_uid, item_uid } = req.query;
		let condition = [];
		condition.push(nome ? { nome: { [Op.like]: `%${nome}%` } } : null);
		condition.push(uid ? { uid: { [Op.eq]: `${uid}` } } : null);
		condition.push(pessoa_uid ? { pessoa_uid: { [Op.eq]: `${pessoa_uid}` } } : null);
		condition.push(status ? { status: { [Op.like]: `%${status}%` } } : null);
		condition.push(protocolo ? { protocolo: { [Op.eq]: `${protocolo}` } } : null);
		condition.push(data_ocorrencia ? { data_ocorrencia: { [Op.between]: [JSON.parse(data_ocorrencia).data_inicial, JSON.parse(data_ocorrencia).data_final] } } : null);
		condition.push(natureza_uid ? { natureza_uid: { [Op.eq]: `${natureza_uid}` } } : null);
		condition.push(item_uid ? { item_uid: { [Op.eq]: `${item_uid}` } } : null);

		const NaturezaOcorrencia = db.natureza_ocorrencia;
		const CategoriaOcorrencia = db.categoria_ocorrencia;
		RegistroOcorrencia.findAndCountAll({
			where: { [Op.and]: condition },
			limit: perPage, // Define a quantidade de registros por página
			offset: (page - 1) * perPage, // Calcula o deslocamento com base na página
			include: [
				{ model: NaturezaOcorrencia, include: [{ model: CategoriaOcorrencia }] },
			]
		})
			.then(data => {
				const totalRegistros = data.count; // Total de registros encontrados
				const paginaAtual = page; // Número da página atual
				const registros = data.rows; // Registros da página desejada
				res.send({ data: registros, totalRegistros, paginaAtual });
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Erro ao buscar registros em registro_ocorrencia"
				});
			});
	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Find a single registro_ocorrencia with an id
exports.findOne = async (req, res) => {
	try {
		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid
		let condition = uid ? { uid: { [Op.eq]: `${uid}` } } : null;
		const registro = await RegistroOcorrencia.findOne({
			where: condition, include: [
				{ all: true, nested: true }
			]
		},)
		if (registro) {
			// montar o registro por completo
			res.send(registro);
		} else {
			res.status(404).send({
				message: "Registro Ocorrência não encontrado."
			});
		}


	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Update a registro_ocorrencia by the id in the request
exports.update = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		let data = req.body;
		// Validar o array de Ocorrencias
		registroOcorrenciaValidation.forEach(({ name, rule }) => {
			const error = validateEntrace(name, data[name], rule)
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

		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid
		
		const registro = await RegistroOcorrencia.findOne({
			where: { uid }, // Substitua pelo critério correto para encontrar o registro desejado
			include: [{ all: true, nested: true }] // Inclua os modelos associados que deseja atualizar
		})
		if (registro) {
			// dados da ocorrencia
			registro.descricao = data.descricao;
			registro.classificacao = data.classificacao;
			registro.data_ocorrencia = data.data_ocorrencia;
			registro.natureza_uid = data.natureza_uid;
			registro.local = data.local; 
			registro.latitude = data.latitude;
			registro.longitude = data.longitude;
			// dados de pessoa
			await registro.pessoa.update(
				{
					nome: data.pessoa.nome,
					rg: data.pessoa.rg,
					endereco: data.pessoa.endereco,
					genero: data.pessoa.genero
				}
			)
			// dados vitima
			await registro.pessoa.Vitima.update({
				email: data.pessoa.vitima.email,
				data_nascimento: data.pessoa.vitima.data_nascimento,
				telefone: data.pessoa.vitima.telefone,

			})
			// vinculo universidade 
			await registro.pessoa.vinculo_universidade.update({ ...data.pessoa.vinculo_universidade });
			// dados do agressor
			await registro.pessoa.Autor.update({ instrumento_portado: data.pessoa.autor.instrumento_portado });
			await registro.item_subtraido.update({ objeto: data.item_subtraido.objeto });

			// Salve as alterações no registro de ocorrência e suas associações
			await registro.save({ include: [{ all: true, nested: true }] }).then(function () {
				res.send({ success: 'Registro e associações atualizados com sucesso!' });
			});

		} else {
			return res.status(404).send({
				message: "Registro Ocorrência não encontrado."
			});
		}

	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Delete a registro_ocorrencia with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all registro_ocorrencias from the database.
exports.deleteAll = (req, res) => {

};

// Find all published registro_ocorrencias
exports.findAllPublished = (req, res) => {

};
// change status registro_ocorrencias
exports.changeStatus = async (req, res) => {
	try {
		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid
		let data = req.body;
		if (data?.status === "Denúncia não confirmada" || data?.status === "Processando") {
			let condition = uid ? { uid: { [Op.eq]: `${uid}` } } : null;
			const registro = await RegistroOcorrencia.findOne({ where: condition })
			if (registro) {
				// montar o registro por completo
				await registro.update({ status: data.status });
				res.send({success: 'Status atualizado com sucesso'});
			} else {
				res.status(404).send({
					message: "Registro Ocorrência não encontrado."
				});
			}
		} else {
			res.status(402).send({
				message:
					"Status fornecidos inválidos"
			});
		}


	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};