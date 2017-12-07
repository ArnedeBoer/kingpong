const Sessions = require('../models').Sessions;

module.exports = {
    verify(req, res) {
        return Sessions
            .findOne({
                where: {
                    hash: req.body.hash
                },
                include: ['users']
            })
            .then(session => {
                if (session) {
                    res.status(201).send(session);
                } else {
                    res.status(404).send();
                }
            })
            .catch(error => res.status(400).send(error));
    }
};
