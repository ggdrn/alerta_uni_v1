const db = require("../models");
const CategoriaOcorrencia = db.categoria_ocorrencia;
const Op = db.Sequelize.Op;

const categoriaOcorrenciaValidation = require("../utils/models/categoria_ocorrencia");
const validateEntrace = require("../utils/validations/index")

// Create and Save a new categoria_ocorrencia
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		const { data } = req.body;
		// Validar o array de categorias
		categoriaOcorrenciaValidation.forEach(({ name, rule }) => {
			data.forEach(categoria => {
				const error = validateEntrace(name, categoria[name], rule)
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

		// Save categoria_ocorrencia in the database
		let registros = []
		console.log('to aqui?')
		for await (categoria_ocorrencia of data) {
			await CategoriaOcorrencia.create(categoria_ocorrencia)
				.then(async data => {
					await registros.push(data);
				})
				.catch(err => {
					res.status(500).send({
						message:
							err.message || "Não foi possível processar a requisição categoria_ocorrencia."
					});
				});
		}
		return res.send({ sucess: "Categorias Registradas com sucesso", data: registros })
	} catch (error) {
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error
		});
	}
};

// Retrieve all categoria_ocorrencias from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

	CategoriaOcorrencia.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving categoria_ocorrencia."
			});
		});
};

// Find a single categoria_ocorrencia with an id
exports.findOne = (req, res) => {

};

// Update a categoria_ocorrencia by the id in the request
exports.update = (req, res) => {

};

// Delete a categoria_ocorrencia with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all categoria_ocorrencias from the database.
exports.deleteAll = (req, res) => {

};

// Find all published categoria_ocorrencias
exports.findAllPublished = (req, res) => {

};