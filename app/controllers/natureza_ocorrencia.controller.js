const db = require("../models");
const NaturezaOcorrencia = db.natureza_ocorrencia;
const Op = db.Sequelize.Op;

// Create and Save a new natureza_ocorrencia
exports.create = (req, res) => {
	// Validate request
	console.log(req.body)
	if (!req.body.nome) {
		res.status(400).send({
		  message: "Content can not be empty!"
		});
		return;
	  }
	
	  // Create a natureza_ocorrencia
	  const natureza_ocorrencia = {
		nome: req.body.nome,
		categoria_id: categoria_id
	  };
	
	  // Save natureza_ocorrencia in the database
	  NaturezaOcorrencia.create(natureza_ocorrencia)
		.then(data => {
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the natureza_ocorrencia."
		  });
	});
};

// Retrieve all natureza_ocorrencias from the database.
exports.findAll = (req, res) => {
	const nome = req.query.nome;
	let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
  
	NaturezaOcorrencia.findAll({ where: condition })
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