const db = require("../models");
const Pessoa = db.pessoa;
const Op = db.Sequelize.Op;

// Create and Save a new pessoa
exports.create = (req, res) => {
	// Validate request
	// if (!req.body.nome) {
	// 	res.status(400).send({
	// 	  message: "Content can not be empty!"
	// 	});
	// 	return;
	//   }
	
	// Create a pessoa
	const pessoa = {
		...req.body,
	};
	console.log(pessoa)
	// Save pessoa in the database
	Pessoa.create(pessoa)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the pessoa."
		});
	});
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