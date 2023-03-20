const db = require("../models");
console.log('aqui')
const CategoriaOcorrencia = db.categoria_ocorrencia;
const Op = db.Sequelize.Op;

// Create and Save a new categoria_ocorrencia
exports.create = (req, res) => {
	// Validate request
	console.log(req.body)
	if (!req.body.nome) {
		res.status(400).send({
		  message: "Content can not be empty!"
		});
		return;
	  }
	
	  // Create a categoria_ocorrencia
	  const categoria_ocorrencia = {
		nome: req.body.nome,
	  };
	
	  // Save categoria_ocorrencia in the database
	  CategoriaOcorrencia.create(categoria_ocorrencia)
		.then(data => {
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the categoria_ocorrencia."
		  });
	});
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