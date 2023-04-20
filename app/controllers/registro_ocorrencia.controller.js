const db = require("../models");
const RegistroOcorrencia = db.registro_ocorrencia;
const Op = db.Sequelize.Op;

// Create and Save a new registro_ocorrencia
exports.create = (req, res) => {
	// Validate request
	// if (!req.body.nome) {
	// 	res.status(400).send({
	// 	  message: "Content can not be empty!"
	// 	});
	// 	return;
	//   }
	
	// Create a registro_ocorrencia
	const registro_ocorrencia = {
		...req.body,
	};
	console.log(registro_ocorrencia)
	// Save registro_ocorrencia in the database
	RegistroOcorrencia.create(registro_ocorrencia)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the registro_ocorrencia."
		});
	});
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