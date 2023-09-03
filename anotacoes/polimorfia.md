Para implementar heranças com características específicas para as tabelas "Autor" e "Vítima" em Sequelize, você pode usar o conceito de associações e tabelas relacionadas. Vou mostrar como criar os modelos e associações para atender aos seus requisitos:

1. **Defina o Modelo "Pessoa"**:

   Primeiro, defina o modelo "Pessoa" com os campos comuns a todas as heranças (uid, nome, rg, endereco, genero):

   ```javascript
   const { Sequelize, DataTypes } = require('sequelize');

   const sequelize = new Sequelize('sua_basedados', 'seu_usuario', 'sua_senha', {
     host: 'localhost',
     dialect: 'mysql', // Substitua pelo dialeto do seu banco de dados
   });

   const Pessoa = sequelize.define('Pessoa', {
     uid: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
     },
     nome: {
       type: DataTypes.STRING,
     },
     rg: {
       type: DataTypes.STRING,
     },
     endereco: {
       type: DataTypes.STRING,
     },
     genero: {
       type: DataTypes.STRING,
     },
   });

   // Defina outras configurações, como índices, associações, etc.
   ```

2. **Defina o Modelo "Autor"**:

   Em seguida, defina o modelo "Autor" com os campos específicos do autor, como "instrumento_portado". Este modelo terá uma associação com o modelo "Pessoa":

   ```javascript
   const Autor = sequelize.define('Autor', {
     instrumento_portado: {
       type: DataTypes.STRING,
     },
   });

   // Associe o modelo Autor com o modelo Pessoa
   Autor.belongsTo(Pessoa);
   ```

3. **Defina o Modelo "Vitima"**:

   Da mesma forma, defina o modelo "Vitima" com os campos específicos da vítima, como "email", "data_nascimento" e "telefone", e associe-o com o modelo "Pessoa":

   ```javascript
   const Vitima = sequelize.define('Vitima', {
     email: {
       type: DataTypes.STRING,
     },
     data_nascimento: {
       type: DataTypes.DATE,
     },
     telefone: {
       type: DataTypes.STRING,
     },
   });

   // Associe o modelo Vitima com o modelo Pessoa
   Vitima.belongsTo(Pessoa);
   ```

4. **Usando a Herança**:

   Agora você pode criar registros nas tabelas "Autor" e "Vitima" que estão associadas à tabela "Pessoa":

   ```javascript
   sequelize.sync()
     .then(() => {
       return Pessoa.create({
         nome: 'Nome da Pessoa',
         rg: '123456',
         endereco: 'Endereço da Pessoa',
         genero: 'Masculino',
       });
     })
     .then((pessoa) => {
       return Autor.create({
         instrumento_portado: 'Guitarra',
       }).then((autor) => {
         autor.setPessoa(pessoa); // Associe o autor à pessoa
       });
     })
     .then(() => {
       return Vitima.create({
         email: 'victima@example.com',
         data_nascimento: '1990-01-01',
         telefone: '123-456-7890',
       }).then((vitima) => {
         vitima.setPessoa(pessoa); // Associe a vítima à mesma pessoa
       });
     })
     .catch((error) => {
       console.error('Erro:', error);
     });
   ```

   Neste exemplo, uma instância de "Pessoa" é criada primeiro e, em seguida, instâncias de "Autor" e "Vitima" são criadas e associadas à mesma instância de "Pessoa". Dessa forma, você tem uma relação de herança entre "Pessoa", "Autor" e "Vitima".

Este é um exemplo simples de implementação de herança no Sequelize. Dependendo dos seus requisitos específicos, você pode estender essa estrutura e adicionar mais complexidade, como associações polimórficas, se necessário. Certifique-se de ajustar os campos e configurações de acordo com o seu caso de uso real.