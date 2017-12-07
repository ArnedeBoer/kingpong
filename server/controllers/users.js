const bcrypt = require('bcrypt');
const User = require('../models').User;
const Sessions = require('../models/').Sessions;
const Op = require('sequelize').Op;
const createHash = require('hash-generator');
const requiredLength = 8;
const checkStringLength = (input, len) => input.length === 0 || input.length >= len;

module.exports = {
    create(req, res) {
        return User
            .create({
                username: checkStringLength(req.body.username, requiredLength) ? req.body.username : undefined,
                password: checkStringLength(req.body.password, requiredLength) ? bcrypt.hashSync(req.body.password, 9) : undefined
            })
            .then(user => res.status(201).send(user.dataValues))
            .catch(error => res.status(400).send(error));
    },
    login(req, res) {
        return User
            .findOne({
                where: {
                    username: req.body.username
                },
                include: ['sessions']
            })
            .then(user => {
                if (user !== '' && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                    const id = user.id;
                    const hash = createHash('32');

                    Sessions.create({
                        hash,
                        userid: id
                    });

                    return res.status(200).send({ hash });
                }

                return res.status(400).send('Failed');
            })
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users.dataValues))
            .catch(error => res.status(400).send(error));
    },
    findByUsername(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.hash
                },
                include: ['users']
            })
            .then(session => {
                if (!session) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(session.users.dataValues);
            })
            .catch(error => res.status(400).send(error));
    },
    filterByUsername(req, res) {
        return User
            .findAll({
                where: {
                    username: {
                        [Op.iLike]: `%${req.params.username}%`
                    }
                },
                order: [
                    ['username']
                ]
            })
            .then(people => res.status(200).send(people))
            .catch(error => res.status(400).send(error));
    },
    edit(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.hash
                }
            })
            .then(session => {
                return User
                    .findOne({
                        where: {
                            id: session.userid
                        }
                    })
                    .then(user => {
                        if (!user) {
                            return res.status(400).send({ message: 'You must be logged in' });
                        }
                        return user.update({
                                username: checkStringLength(req.body.username, requiredLength) ? req.body.username : undefined,
                                password: checkStringLength(req.body.password, requiredLength) ? bcrypt.hashSync(req.body.password, 9) : undefined
                            })
                            .then(editedUser => res.status(201).send(editedUser.dataValues))
                            .catch(error => res.status(400).send(error));
                    });
        });
    }
};
