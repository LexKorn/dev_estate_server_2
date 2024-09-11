const {Compare} = require('../models/models');

const _transformCompare = (compare) => {
    return {
        id: compare.id,
        idOfFlat: compare.idOfFlat,
        userId: compare.userId
    }
};

class ComparesController {
    async create(req, res) {
        try {
            const {id} = req.user;
            let {idOfFlat} = req.body;

            const compare = await Compare.create({idOfFlat, userId: id});            
            return res.json(_transformCompare(compare));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const {id} = req.user;
            const compares = await Compare.findAll({where:{userId: id}});
            return res.json(compares.map(compare => _transformCompare(compare)));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Compare.destroy({where: {userId: req.user.id, idOfFlat: id}});
            return res.json('Compare was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ComparesController();