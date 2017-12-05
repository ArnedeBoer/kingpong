module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false.
                validation: {
                    len: { args: 8 }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validation: {
                    len: { args: 8 }
                }
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('Users')
};
