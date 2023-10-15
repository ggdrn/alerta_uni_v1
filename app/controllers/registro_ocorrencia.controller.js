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