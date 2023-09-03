module.exports = (sequelize, Sequelize) => {
    const ItemSubtraido = sequelize.define("item_subtraido", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        objeto: {
            type: Sequelize.STRING,
        },
    },
        {
            tableName: 'item_subtraido',
        });

    return ItemSubtraido;
};