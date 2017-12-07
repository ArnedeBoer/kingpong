const Matches = require('../models').Matches;
const Sessions = require('../models/').Sessions;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.playerOne
                }
            })
            .then(session => {
                return Matches
                    .create({
                        playerOne: session.dataValues.userid,
                        playerTwo: req.body.playerTwo,
                        scoreOne: req.body.scoreOne,
                        scoreTwo: req.body.scoreTwo
                    })
                    .then(match => res.status(201).send(match))
                    .catch(error => res.status(400).send(error));
            });
    },
    list(req, res) {
        return Matches
            .findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: ['playerOneMatches', 'playerTwoMatches']
            })
            .then(matches => res.status(200).send(matches));
    },
    listMine(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.hash
                }
            }).then(session => {
                return Matches
                    .findAll({
                        where: {
                            [Op.or]: {
                                playerOne: session.userid,
                                playerTwo: session.userid
                            }
                        },
                        order: [
                            ['id', 'DESC']
                        ],
                        include: ['playerOneMatches', 'playerTwoMatches']
                    })
                    .then(matches => res.status(200).send(matches));
            });
    },
    listConfirmed(req, res) {
        return Matches
            .findAll({
                where: {
                    confirmed: true
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
    confirm(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.hash
                }
            }).then(session => {
                return Matches
                    .findOne({
                        where: {
                            [Op.and]: {
                                id: {
                                    [Op.eq]: req.body.id
                                },
                                playerTwo: {
                                    [Op.eq]: session.userid
                                }
                            }
                        },
                        include: ['playerOneMatches', 'playerTwoMatches']
                    })
                    .then(match => {
                        match.update({
                            confirmed: true
                        })
                        .then(updatedMatch => res.status(200).send(updatedMatch));
                    })
                    .catch(error => res.status(403).send(error));
            });
    },
    mvp(req, res) {
        return Matches.
            findAll({
                where: {
                    confirmed: true
                },
                include: ['playerOneMatches', 'playerTwoMatches']
            })
            .then(matches => {
                const winners = matches.map(match => {
                    const { playerOneMatches, playerTwoMatches, scoreOne, scoreTwo } = match;

                    return scoreOne > scoreTwo ? playerOneMatches.username : playerTwoMatches.username;
                });
                const winningPlayers = [...new Set(winners)];
                const scores = winningPlayers.map(winningPlayer => {
                    return {
                        name: winningPlayer,
                        score: winners.filter(winner => winner === winningPlayer).length
                    };
                });

                const mvp = scores.reduce((x, y) => {
                    return x.score === Math.max(x.score, y.score) ? x : y;
                });

                res.status(200).send(mvp);
            })
            .catch(error => res.status(400).send(error));
    }
};
