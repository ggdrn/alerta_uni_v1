const db = require("../models");
const Adminstrador = db.adminstrador;
const Op = db.Sequelize.Op;

// Create and Save a new Adminstrador
exports.create = (req, res) => {
	// Validate request
	console.log(req.body)
	if (!req.body.nome) {
		res.status(400).send({
		  message: "Content can not be empty!"
		});
		return;
	  }
	
	  // Create a adminstrador
	  const adminstrador = {
		nome: req.body.nome,
		cpf: req.body.cpf,
		email: req.body.email
	  };
	
	  // Save Adminstrador in the database
	  Adminstrador.create(adminstrador)
		.then(data => {
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the Adminstrador."
		  });
	});
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