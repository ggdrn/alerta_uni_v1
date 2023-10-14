const db = require("../models");
const Adminstrador = db.adminstrador;
const Op = db.Sequelize.Op;
const administradorValidation = require("../utils/models/administrador");
const validateEntrace = require("../utils/validations/index");

// Create and Save a new Adminstrador
exports.create = (req, res) => {
	try {
		// validação da request
		let erros = [];
		administradorValidation.forEach(({name, rule}) => {
			if (name === 'cpf'){
				// Remove todos os caracteres não numéricos
				req.body[name] = req.body[name].replace(/\D/g, '');
			}
			const error = validateEntrace(name, req.body[name], rule)
			if (error) {
				erros.push(error)
			}
		});
		if (erros.length) {
			return res.status(400).send({
				message: "Não foi possível processar a requisição",
				erros
			});
		}
		// creação do usuário após validação aporvada
		const adminstrador = {
			nome: req.body.nome,
			cpf: req.body.cpf,
			email: req.body.email
		};

		// Save Adminstrador in the database
		return Adminstrador.create(adminstrador)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					...err || "Some error occurred while creating the Adminstrador."
				});
			});
	} catch (error) {
		// Trate erros aqui
		res.status(500).send({
			message: "Não foi possível processar a requisição",
			error
		}); // Passe o erro para o middleware de tratamento de erros
	  }
};

// Retrieve all Adminstradors from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
  
	Adminstrador.findAll({ where: condition })
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving Adminstradores."
		});
	  });
  };

// Find a single Adminstrador with an id
exports.findOne = (req, res) => {
  
};

// Update a Adminstrador by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Adminstrador with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Adminstradors from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Adminstradors
exports.findAllPublished = (req, res) => {
  
};