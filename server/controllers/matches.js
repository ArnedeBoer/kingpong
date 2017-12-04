const Matches = require('../models').Matches;
const Users = require('../models').Users;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return Matches
            .create({
                playerOne: req.body.playerOne,
                playerTwo: req.body.playerTwo,
                scoreOne: req.body.scoreOne,
                scoreTwo: req.body.scoreTwo
            })
            .then(match => res.status(201).send(match))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Matches
            .findAll({
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(matches => res.status(200).send(matches));
    },
    listMine(req, res) {
        return Matches
            .findAll({
                where: {
                    [Op.or]: {
                        playerOne: req.body.id,
                        playerTwo: req.body.id
                    }
                },
                order: [
                    ['id', 'DESC']
                ],
                include: ['playerOneMatches', 'playerTwoMatches']
            })
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
    confirm(req, res) {
        return Matches
            .findById(req.body.id)
            .then(match => {
                match.update({
                    confirmed: true
                })
                .then(updatedMatch => res.status(200).send(updatedMatch));
            })
            .catch(error => res.status(403).send(error));
    }
};
