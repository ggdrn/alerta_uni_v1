const db = require("../models");
const VinculoUniversidade = db.vinculo_universidade;
const Op = db.Sequelize.Op;

const vinculoUniversidadeValidation = require("../utils/models/vinculo_universidade");
const validateEntrace = require("../utils/validations/index")
// Create and Save a new item_subtraido
exports.create = async (req, res) => {
    try {
        // validação da request
        let erros = [];
        const data = req.body;
        // Validar o array de pessoas
        vinculoUniversidadeValidation.forEach(({ name, rule }) => {
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

        await VinculoUniversidade.create(data)
            .then(data => {
                registros = data;
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Não foi possível processar a requisição de Vinculo Universidade."
                });
            });
        return res.send({ sucess: "Vinculo Universidade Registrado com sucesso", data: registros })
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível processar a requisição",
            error
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