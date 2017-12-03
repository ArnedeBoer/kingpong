const usersController = require('../controllers').users;
const matchesController = require('../controllers').matches;

module.exports = app => {
    app.get('/api/user/all', usersController.list);
    app.get('/api/user/:userid', usersController.retrieve);
    app.get('/api/user/find/:username', usersController.findByUsername);
    app.get('/api/user/filter/:username', usersController.filterByUsername);
    app.post('/api/user/edit/:id', usersController.edit);
    app.post('/api/user/login', usersController.login);
    app.post('/api/user/create', usersController.create);

    app.post('/api/match/create/', matchesController.create);
};
