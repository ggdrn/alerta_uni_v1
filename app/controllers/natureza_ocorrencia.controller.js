const db = require("../models");
const NaturezaOcorrencia = db.natureza_ocorrencia;
const Op = db.Sequelize.Op;

const naturezaOcorrenciaValidation = require("../utils/models/natureza_ocorrencia");
const validateEntrace = require("../utils/validations/index")

// Create and Save a new natureza_ocorrencia
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		const { data } = req.body;
		// Validar o array de naturezas
		naturezaOcorrenciaValidation.forEach(({ name, rule }) => {
			data.forEach(natureza => {
				const error = validateEntrace(name, natureza[name], rule)
				if (error) {
					erros.push(error)
				}
			})
		})

		if (erros.length) {
			return res.status(400).send({
				message: "Não foi possível processar a requisição",
				erros
			});
		}

		// Save natureza_ocorrencia in the database
		let registros = []
		for await (natureza_ocorrencia of data) {
			await NaturezaOcorrencia.create(natureza_ocorrencia)
				.then(async data => {
					await registros.push(data);
				})
				.catch(err => {
					res.status(500).send({
						message:
							err.message || "Não foi possível processar a requisição natureza_ocorrencia."
					});
				});
		}
		return res.send({ sucess: "naturezas Registradas com sucesso", data: registros })
	} catch (error) {
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error
		});
	}
};

// Retrieve all natureza_ocorrencias from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	const categoria_uid = req.query.categoria_uid;
	let condition = [];
	condition.push(nome ? { nome: { [Op.like]: `%${nome}%` } } : null);
	condition.push(categoria_uid ? { categoria_uid: { [Op.like]: `%${categoria_uid}%` } } : null);
	console.log(condition);

	NaturezaOcorrencia.findAll({ where: { [Op.and]: condition } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving natureza_ocorrencia."
			});
		});
};

// Find a single natureza_ocorrencia with an id
exports.findOne = (req, res) => {

};

// Update a natureza_ocorrencia by the id in the request
exports.update = (req, res) => {

};

// Delete a natureza_ocorrencia with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all natureza_ocorrencias from the database.
exports.deleteAll = (req, res) => {

};

// Find all published natureza_ocorrencias
exports.findAllPublished = (req, res) => {

};