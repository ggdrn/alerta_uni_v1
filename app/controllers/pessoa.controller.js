const db = require("../models");
const Pessoa = db.pessoa;
const Op = db.Sequelize.Op;
const Vitima = db.sequelize.models.Vitima;

const pessoaValidation = require("../utils/models/pessoa");
const validateEntrace = require("../utils/validations/index")
// Create and Save a new pessoa
exports.create = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		const data = req.body;
		// Validar o array de pessoas
		pessoaValidation.forEach(({ name, rule }) => {
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
		const payloadPessoa = {
			"nome": data.nome,
			"rg": data.rg,
			"endereco": data.endereco,
			"genero": data.genero,
			"universidade_uid": data.universidade_uid,
		}
		let payloadVitima = {
			"email": data.email,
			"data_nascimento": data.data_nascimento,
			"telefone": data.telefone
		}
		const result = await Pessoa.create(payloadPessoa)
		registros = result;
		payloadVitima.pessoa_uid = result.uid;
		const vitima = await Vitima.create(payloadVitima)
		registros.dataValues.vitima = vitima;

		return res.send({ sucess: "Pessoa Registradas com sucesso", data: registros })
	} catch (error) {
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error: error.message
		});
	}
};

// Retrieve all pessoa from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

	Pessoa.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving pessoa."
			});
		});
};

// Find a single pessoa with an id
exports.findOne = (req, res) => {

};

// Update a pessoa by the id in the request
exports.update = (req, res) => {

};

// Delete a pessoa with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all pessoas from the database.
exports.deleteAll = (req, res) => {

};

// Find all published pessoas
exports.findAllPublished = (req, res) => {

};