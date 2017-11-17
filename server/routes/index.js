const usersController = require('../controllers').users;
const matchesController = require('../controllers').matches;

module.exports = app => {
    app.get('/api/user/all', usersController.list);
    app.get('/api/user/:userid', usersController.retrieve);
    app.get('/api/user/find/:username', usersController.findByUsername);
    app.post('/api/user/create', usersController.create);

    app.post('/api/match/create/:playerOne/:playerTwo', matchesController.create);
};
