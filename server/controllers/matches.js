const Matches = require('../models').Matches;

module.exports = {
    create(req, res) {
        return Matches
            .create({
                scoreOne: req.body.scoreOne,
                scoreTwo: req.body.scoreTwo,
                playerOne: req.session.user.id,
                playerTwo: req.body.playerTwo
            })
            .then(match => res.status(201).send(match))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Matches
            .findAll()
            .then(matches => res.status(200).send(matches));
    },
    delete(req, res) {
        return Matches
            .destory({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).send({ message: 'Success' }))
            .catch(error => res.status(400).send(error));
    },
    editScore(req, res) {
        return Matches
            .findOne({
                where: {
                    playerOne: req.session.user.id,
                    id: req.session.user.id // Unsure where the match's id will be stored
                }
            })
            .then(match => {
                if (match) {
                    return match.update({
                            scoreOne: req.body.scoreOne,
                            scoreTwo: req.body.scoreTwo
                        })
                        .then(updatedMatch => res.status(201).send(updatedMatch));
                }

                return res.status(403).send({ message: 'User not permitted' });
            })
            .catch(error => res.status(400).send(error));
    },
    confirmScore(req, res) {
        return Matches
            .findOne({
                where: {
                    playerTwo: req.session.user.id,
                    id: req.session.user.id // Unsure where the match's id will be stored
                }
            })
            .then(match => {
                match.update({
                    confirmed: true
                })
                .then(updatedMatch => res.status(200).send(updatedMatch));
            })
            .catch(error => res.status(403).send(error));
    }
};
