module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Matches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            scoreOne: {
                type: Sequelize.DATE,
                allowNull: false
            },
            scoreTwo: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            playerOne: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'playerOne'
                }
            },
            playerTwo: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'playerTwo'
                }
            }
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('Matches')
};
