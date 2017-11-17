const Matches = require('../models').Matches;

module.exports = {
    create(req, res) {
        return Matches
            .create({
                scoreOne: req.body.scoreOne,
                scoreTwo: req.body.scoreTwo,
                playerOne: req.params.playerOne,
                playerTwo: req.params.playerTwo
            })
            .then(match => res.status(201).send(match))
            .catch(error => res.status(400).send(error));
    }
};
