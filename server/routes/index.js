const usersController = require('../controllers').users;
const matchesController = require('../controllers').matches;
const sessionsController = require('../controllers').sessions;

module.exports = app => {
    app.get('/api/user/all', usersController.list);
    app.post('/api/user/find/', usersController.findByUsername);
    app.get('/api/user/filter/:username', usersController.filterByUsername);
    app.post('/api/user/edit/', usersController.edit);
    app.post('/api/user/login', usersController.login);
    app.post('/api/user/create', usersController.create);

    app.post('/api/match/create/', matchesController.create);
    app.get('/api/match/list/all', matchesController.list);
    app.post('/api/match/list/mine/', matchesController.listMine);
    app.get('/api/match/list/confirmed/', matchesController.listConfirmed);
    app.post('/api/match/confirm/', matchesController.confirm);
    app.get('/api/match/mvp/', matchesController.mvp);

    app.post('/api/user/hash/', sessionsController.verify);
};
