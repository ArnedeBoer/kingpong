const bcrypt = require('bcrypt');
const User = require('../models').User;
const requiredLength = 8;
const checkStringLength = (input, len) => input.length === 0 || input.length >= len;
const checkNameUse = (input) => User.findOne({ where:{ username: input } }).then(user => user ? true : false )

module.exports = {
    create(req, res) {
        return User
            .create({
                username: checkStringLength(req.body.username, requiredLength) && checkNameUse(req.body.username) ? req.body.username : undefined,
                password: checkStringLength(req.body.password, requiredLength) ? bcrypt.hashSync(req.body.password, 9) : undefined
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    login(req,res) {
        return User
            .findOne({
                where:{
                    username: req.body.username
                }
            })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err,res) =>
                        res ? res.status(200).send(users) : res.status(401).send({ message: 'Invalid Password' }))
                } else {
                    res.status(401).send({ message: 'Username not found' })
                }
            })
            .catch(error => res.status(400).send(error));
    }
    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findById(req.params.userid)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    findByUsername(req, res) {
        return User
            .findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    }
};
