module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Matches', [{
            scoreOne: 9,
            scoreTwo: 11,
            playerOne: 1,
            playerTwo: 2
        },
        {
            scoreOne: 11,
            scoreTwo: 9,
            playerOne: 1,
            playerTwo: 2
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Matches', null, {});
    }
};
