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
    app.get('/api/match/list/all', matchesController.list);
    app.post('/api/match/list/mine/', matchesController.listMine);
    app.get('/api/match/list/confirmed/', matchesController.listConfirmed);
    app.post('/api/match/confirm/', matchesController.confirm);
    app.get('/api/match/mvp/', matchesController.mvp);
};
