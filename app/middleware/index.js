
// Chave secreta para assinar e verificar tokens JWT
const db = require("../models");
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const AuthToken = db.sequelize.models.auth_token;
// Middleware de autenticação
function autenticacaoMiddleware(req, res, next) {
    // Para Acessar a rota usuário, qualquer um consegue requisitar sem token
    const { originalUrl } = req;
    if (originalUrl.includes('login')) {
        return next();
    }
    // Vamos verificar o token na requisição
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
    } else {
        let condition = { token: { [Op.eq]: token } };
        AuthToken.findOne({ where: condition })
            .then(data => {
                if (data) {
                    const tokenAutenticated = data.token;
                    try {
                        // Verifique e decodifique o token JWT usando a chave secreta correta
                        if (token === tokenAutenticated) {
                            // Se o token é válido, passe para a próxima rota
                            return next();
                        } else {
                            return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
                        }

                    } catch (erro) {
                        return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
                    }
                } else {
                    return res.status(401).json({ mensagem: 'Token de autenticação não encontrado.' });
                }
            })
            .catch(err => {
                res.status(401).send({
                    message: "Erro ao buscar o token de autenticação",
                    error: err
                });
            });
    }
}
module.exports = autenticacaoMiddleware; 