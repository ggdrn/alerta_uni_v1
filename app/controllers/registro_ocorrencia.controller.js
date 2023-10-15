const db = require("../models");
const RegistroOcorrencia = db.registro_ocorrencia;
const Op = db.Sequelize.Op;

const registroOcorrenciaValidation = require("../utils/models/registro_ocorrencia");
const validateEntrace = require("../utils/validations/index")
// Create and Save a new registro_ocorrencia
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		const data = req.body;
		// Validar o array de pessoas
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

		// Save pessoa in the database
		let registros = {}

		await RegistroOcorrencia.create(data)
			.then(data => {
				registros = data;
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Não foi possível processar a requisição de Pessoa."
				});
			});
		return res.send({ sucess: "pessoas Registradas com sucesso", data: registros })
	} catch (error) {
		console.log('estou aqui?')
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error
		});
	}
};


// Retrieve all registro_ocorrencia from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

	RegistroOcorrencia.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving registro_ocorrencia."
			});
		});
};

// Find a single registro_ocorrencia with an id
exports.findOne = (req, res) => {

};

// Update a registro_ocorrencia by the id in the request
exports.update = (req, res) => {

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