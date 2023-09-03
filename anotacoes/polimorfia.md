Se você deseja implementar heranças com polimorfia no Sequelize para as tabelas "Autor" e "Vítima", você pode usar a técnica de tabelas polimórficas junto com a associação `BelongsTo` para associar a tabela "Pessoa" a ambas as tabelas "Autor" e "Vítima". 

Aqui está como você pode fazer isso:

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

2. **Defina os Modelos "Autor" e "Vítima"**:

   Em seguida, defina os modelos "Autor" e "Vítima" com os campos específicos de cada herança, como "instrumento_portado" para "Autor" e "email", "data_nascimento" e "telefone" para "Vítima". Esses modelos terão uma associação `BelongsTo` com o modelo "Pessoa":

   ```javascript
   const Autor = sequelize.define('Autor', {
     instrumento_portado: {
       type: DataTypes.STRING,
     },
   });

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

   // Associe os modelos Autor e Vitima com o modelo Pessoa usando polimorfismo
   Pessoa.hasOne(Autor, { foreignKey: 'pessoaId', constraints: false });
   Pessoa.hasOne(Vitima, { foreignKey: 'pessoaId', constraints: false });
   ```

   Neste exemplo, estamos usando `Pessoa.hasOne` para criar uma associação entre "Pessoa" e "Autor" e outra entre "Pessoa" e "Vítima". O parâmetro `constraints: false` é importante aqui, pois estamos usando polimorfismo e não queremos adicionar restrições de chave estrangeira à tabela "Pessoa".

3. **Usando a Herança**:

   Agora você pode criar registros nas tabelas "Autor" e "Vítima" associadas à tabela "Pessoa":

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
         pessoa.setAutor(autor); // Associe o autor à pessoa
       });
     })
     .then(() => {
       return Vitima.create({
         email: 'victima@example.com',
         data_nascimento: '1990-01-01',
         telefone: '123-456-7890',
       }).then((vitima) => {
         pessoa.setVitima(vitima); // Associe a vítima à mesma pessoa
       });
     })
     .catch((error) => {
       console.error('Erro:', error);
     });
   ```

   Neste exemplo, uma instância de "Pessoa" é criada primeiro e, em seguida, instâncias de "Autor" e "Vítima" são criadas e associadas à mesma instância de "Pessoa". Dessa forma, você tem uma relação de herança com polimorfismo entre "Pessoa", "Autor" e "Vítima".

Esta é uma implementação de herança com polimorfismo no Sequelize. Você pode ajustar os campos e configurações de acordo com suas necessidades específicas. Certifique-se de usar os métodos de associação corretos para associar as entidades relacionadas.