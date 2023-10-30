const db = require("../models");
const TipoVinculo = db.tipo_vinculo;
const Op = db.Sequelize.Op;


const tipoVinculoValidation = require("../utils/models/tipo_vinculo");
const validateEntrace = require("../utils/validations/index")

// Create and Save a new tipo_vinculo
exports.create = async (req, res) => {
    try {
        // validação da request
        let erros = [];
        const { data } = req.body;
        // Validar o array de categorias
        tipoVinculoValidation.forEach(({ name, rule }) => {
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

        // Save tipo_vinculo in the database
        let registros = []

        for await (tipo_vinculo of data) {
            await TipoVinculo.create(tipo_vinculo)
                .then(async data => {
                    await registros.push(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Não foi possível processar a requisição tipo_vinculo."
                    });
                });
        }
        return res.send({ sucess: "Tipos de vinculos registrados com sucesso", data: registros })
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível processar a requisição",
            error
        });
    }
};

// Retrieve all tipo_vinculos from the database.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    let condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

    TipoVinculo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tipo_vinculo."
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