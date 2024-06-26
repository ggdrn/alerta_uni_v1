const db = require("../models");

const RegistroOcorrencia = db.registro_ocorrencia;
const Pessoa = db.pessoa;
const Vitima = db.sequelize.models.Vitima;
const Autor = db.sequelize.models.Autor;
const VinculoUniversidade = db.vinculo_universidade;
const ItemSubtraido = db.item_subtraido;
const StatusHistorico = db.status_historico;
const Op = db.Sequelize.Op;

const registroOcorrenciaValidation = require("../utils/models/registro_ocorrencia");
const pessoaValidation = require("../utils/models/pessoa");
const itemSubtraidoValidation = require("../utils/models/item_subtraido");
const vinculoUniversidadeValidation = require("../utils/models/vinculo_universidade");
const validateEntrace = require("../utils/validations/index")
const { stautsFormater } = require("../utils/dicionario")

// Create and Save a new registro_ocorrencia
exports.create = async (req, res) => {
	const {
		nome,
		rg,
		endereco,
		genero,
		email,
		data_nascimento,
		telefone,
		descricao,
		classificacao,
		data_ocorrencia,
		natureza_uid,
		curso,
		departamento,
		matricula,
		tipo_uid,
		instrumento_portado,
		objeto,
		latitude,
		longitude,
		local
	} = req.body;

	//   validação da request
	let erros = [];
	let data = req.body;
	// Validar o array de Ocorrencias
	registroOcorrenciaValidation.forEach(({ name, rule }) => {
		const error = validateEntrace(name, data[name], rule)
		if (error) {
			erros.push(error)
		}
	})
	itemSubtraidoValidation.forEach(({ name, rule }) => {
		const error = validateEntrace(name, data[name], rule)
		if (error) {
			erros.push(error)
		}
	})
	vinculoUniversidadeValidation.forEach(({ name, rule }) => {
		const error = validateEntrace(name, data[name], rule)
		if (error) {
			erros.push(error)
		}
	})
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

	const transaction = await RegistroOcorrencia.sequelize.transaction();

	try {

		// 1. Criar o Vínculo com a Universidade
		const vinculo = await VinculoUniversidade.create(
			{
				curso,
				departamento,
				matricula,
				tipo_uid,
			},
			{ transaction }
		);

		// 2. Criar a Pessoa
		const pessoa = await Pessoa.create(
			{
				nome,
				rg,
				endereco,
				genero,
				universidade_uid: vinculo.uid
			},
			{ transaction }
		);
		// 3. Criar a Vítima
		const vitima = await Vitima.create(
			{
				email,
				data_nascimento,
				telefone,
				pessoa_uid: pessoa.uid,
			},
			{ transaction }
		);

		let registros = {};

		// Gerar o protocolo da ocorrência
		RegistroOcorrencia.beforeCreate(async (registro, options) => {
			const ultimoRegistro = await RegistroOcorrencia.findOne({
				order: [['createdAt', 'DESC']], // Ordena por createdAt em ordem decrescente
			});
			const protocolo = ultimoRegistro.protocolo ? "aup-" + (parseFloat(ultimoRegistro.protocolo.match(/\d+/)) + 1) : "aup-" + 1;
			registro.protocolo = protocolo;
		});

		// 4. Salvar os itens subtraídos (se houver)
		if (objeto) {
			const objetoCreated = await ItemSubtraido.create(
				{
					objeto,
				},
				{ transaction }
			);
		}

		// 5. Salvar o instrumento portado (se houver)
		if (instrumento_portado) {
			await Autor.create(
				{
					instrumento_portado,
					pessoa_uid: pessoa.uid,
				},
				{ transaction }
			);
		}

		// 6. Criar o Registro da Ocorrência
		const ocorrencia = await RegistroOcorrencia.create(
			{
				descricao,
				classificacao,
				status: "aberta",
				data_ocorrencia,
				natureza_uid,
				pessoa_uid: pessoa.uid,
				latitude,
				longitude,
				local,
				...(objeto) && { item_uid: objetoCreated.uid },
			},
			{ transaction }
		)


		// Commit da transação
		await transaction.commit();
		res.status(201).json({ message: 'Ocorrência registrada com sucesso!', data: ocorrencia });
	} catch (error) {
		// Rollback da transação em caso de erro
		await transaction.rollback();
		console.error(error);
		res.status(500).json({ message: error?.message || 'Erro ao registrar a ocorrência.', erros: [{ message: error?.message }] });
	}
}

// Retrieve all registro_ocorrencia from the database.
exports.findAll = async (req, res) => {
	try {
		const { per_page = 20, page = 1 } = req.query;
		const { nome, uid, pessoa_uid, status, protocolo, data_ocorrencia, natureza_uid, item_uid, categoria_uid } = req.query;
		let condition = [];
		condition.push(nome ? { nome: { [Op.like]: `%${nome}%` } } : null);
		condition.push(uid ? { uid: { [Op.eq]: `${uid}` } } : null);
		condition.push(pessoa_uid ? { pessoa_uid: { [Op.eq]: `${pessoa_uid}` } } : null);
		condition.push(status ? { status: { [Op.like]: `%${status}%` } } : null);
		condition.push(protocolo ? { protocolo: { [Op.eq]: `${protocolo}` } } : null);
		condition.push(data_ocorrencia ? { data_ocorrencia: { [Op.between]: [JSON.parse(data_ocorrencia).data_inicial, JSON.parse(data_ocorrencia).data_final] } } : null);
		condition.push(natureza_uid ? { natureza_uid: { [Op.eq]: `${natureza_uid}` } } : null);
		condition.push(item_uid ? { item_uid: { [Op.eq]: `${item_uid}` } } : null);

		const conditionCategoria = categoria_uid ? { categoria_uid: { [Op.eq]: `${categoria_uid}` } } : null

		const NaturezaOcorrencia = db.natureza_ocorrencia;
		const CategoriaOcorrencia = db.categoria_ocorrencia;
		const data = await RegistroOcorrencia.findAndCountAll({
			where: { [Op.and]: condition },
			limit: parseInt(per_page), // Define a quantidade de registros por página
			offset: (page - 1) * parseInt(per_page), // Calcula o deslocamento com base na página
			include: [
				{
					model: NaturezaOcorrencia, include: [{ model: CategoriaOcorrencia }], where: {
						...conditionCategoria // Busca NaturezasOcorrencias que pertencem à categoria fornecida
					},
				},
			]
		})

		const totalRegistros = data.count; // Total de registros encontrados
		const registrosDaPagina = data.rows // Registros da página desejada

		const registrosFormatados = registrosDaPagina.map(item => {
			return {
				...item.toJSON(),  // Use toJSON() para remover campos circulares 
				status_exibicao: stautsFormater[item.status] ?? "" // Adiciona o campo status_exibicao 
			};
		});
		res.send({
			data: registrosFormatados,
			totalRegistros: parseInt(totalRegistros),
			page: parseInt(page),
			per_page: parseInt(per_page)
		});

	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Find a single registro_ocorrencia with an id
exports.findOne = async (req, res) => {
	try {
		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid
		const protocolo = req.query.protocolo
		let condition = [];
		condition.push(uid ? { uid: { [Op.eq]: `${uid}` } } : null);
		condition.push(protocolo ? { protocolo: { [Op.eq]: `${protocolo}` } } : null);
		const registro = await RegistroOcorrencia.findOne({
			where: { [Op.and]: condition }, include: [
				{ all: true, nested: true }
			]
		},)
		if (registro) {
			// montar o registro por completo
			const registrosFormatado = {
				...registro.toJSON(),
				status_exibicao: stautsFormater[registro.status] ?? ""
			}
			res.send(registrosFormatado);
		} else {
			res.status(404).send({
				message: "Registro Ocorrência não encontrado."
			});
		}


	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Update a registro_ocorrencia by the id in the request
exports.update = async (req, res) => {
	try {
		// validação da request
		let erros = [];
		let data = req.body;
		// Validar o array de Ocorrencias
		registroOcorrenciaValidation.forEach(({ name, rule }) => {
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

		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid

		const registro = await RegistroOcorrencia.findOne({
			where: { uid }, // Substitua pelo critério correto para encontrar o registro desejado
			include: [{ all: true, nested: true }] // Inclua os modelos associados que deseja atualizar
		})
		if (registro) {
			// dados da ocorrencia
			registro.descricao = data.descricao;
			registro.classificacao = data.classificacao;
			registro.data_ocorrencia = data.data_ocorrencia;
			registro.natureza_uid = data.natureza_uid;
			registro.local = data.local;
			registro.latitude = data.latitude;
			registro.longitude = data.longitude;
			// dados de pessoa
			await registro.pessoa.update(
				{
					nome: data.pessoa.nome,
					rg: data.pessoa.rg,
					endereco: data.pessoa.endereco,
					genero: data.pessoa.genero
				}
			)
			// dados vitima
			await registro.pessoa.Vitima.update({
				email: data.pessoa.vitima.email,
				data_nascimento: data.pessoa.vitima.data_nascimento,
				telefone: data.pessoa.vitima.telefone,

			})
			// vinculo universidade 
			await registro.pessoa.vinculo_universidade.update({ ...data.pessoa.vinculo_universidade });
			// dados do agressor informações opicionais
			if (registro.pessoa.Autor) {
				await registro.pessoa.Autor.update({ instrumento_portado: data.pessoa.autor.instrumento_portado });
			} else {
				await Autor.create(
					{
						instrumento_portado: data.pessoa.autor.instrumento_portado,
						pessoa_uid: registro.pessoa.uid,
					});
			}

			if (registro.item_subtraido) {
				await registro.item_subtraido.update({ objeto: data.item_subtraido.objeto });
			} else {
				await registro.item_subtraido.create({ objeto: data.item_subtraido.objeto });
				const objetoCreated = await ItemSubtraido.create({ objeto });
				registro.item_uid = objetoCreated.uid;
			}



			// Salve as alterações no registro de ocorrência e suas associações
			await registro.save({ include: [{ all: true, nested: true }] }).then(function () {
				res.send({ success: 'Registro e associações atualizados com sucesso!' });
			});

		} else {
			return res.status(404).send({
				message: "Registro Ocorrência não encontrado."
			});
		}

	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
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
// change status registro_ocorrencias
exports.changeStatus = async (req, res) => {
	try {
		// Importações para montar o registro ocorrencia por completo
		const uid = req.params.uid
		let data = req.body;
		let condition = uid ? { uid: { [Op.eq]: `${uid}` } } : null;
		const registro = await RegistroOcorrencia.findOne({ where: condition })
		if (registro) {
			// montar o registro por completo
			await registro.update({ status: data.status_novo });
			await StatusHistorico.create({
				...data,
				ocorrencia_uid: uid,
			})
			res.send({ success: 'Status atualizado com sucesso' });
		} else {
			res.status(404).send({
				message: "Registro Ocorrência não encontrado."
			});
		}

	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar registros em registro_ocorrencia."
		});
	}
};

// Lista o histórico de Status
exports.findAllStatus = async (req, res) => {
	try {
		const nome = req.query.nome;
		const uid = req.params.uid
		let condition = { ocorrencia_uid: { [Op.eq]: `${uid}` } }

		const data = await StatusHistorico.findAll({ where: condition, order: [['createdAt', 'ASC']] })
		let registroFormarado = data.map(item => ({
			...item.toJSON(),
			status_novo_exibicao: stautsFormater[item.status_novo],
			status_antigo_exibicao: stautsFormater[item.status_antigo]
		}))
		res.send({ data: registroFormarado });


	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar historico dos status da ocorrência."
		});
	}
};

// Lista Informações importantes para aa dashboard
exports.countOcorrencias = async (req, res) => {
	try {

		// 1. Total de ocorrências
		const totalOcorrencias = await RegistroOcorrencia.count();

		// 2. Total de ocorrências com status "Aberta"
		const totalAbertas = await RegistroOcorrencia.count({
			where: { status: 'aberta' }
		});

		// 3. Total de ocorrências com status "Em Apuração"
		const totalEmApuracao = await RegistroOcorrencia.count({
			where: { status: 'apuracao' }
		});

		// 4. Total de ocorrências com status "Encerrada"
		const totalEncerradas = await RegistroOcorrencia.count({
			where: { status: 'encerrada' }
		})

		// 4. Total de ocorrências com status "Pendentes"
		const totalPendetes = await RegistroOcorrencia.count({
			where: { status: 'pendente' }
		});

		res.send({
			totalOcorrencias,
			totalAbertas,
			totalEmApuracao,
			totalEncerradas,
			totalPendetes,
		});

	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Erro ao buscar historico dos status da ocorrência."
		});
	}
};