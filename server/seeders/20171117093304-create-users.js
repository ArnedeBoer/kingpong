module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'arne',
            password: 'arne'
        },
        {
            username: 'vincent',
            password: 'vincent'
        }], {});
    },

    down: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
