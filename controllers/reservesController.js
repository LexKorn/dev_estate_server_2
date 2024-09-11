const {Reserve} = require('../models/models');

const _transformReserve = (reserve) => {
    return {
        id: reserve.id,
        idOfFlat: reserve.idOfFlat,
        userId: reserve.userId
    }
};

class ReservesController {
    async create(req, res) {
        try {
            const {id} = req.user;
            let {idOfFlat} = req.body;

            const reserve = await Reserve.create({idOfFlat, userId: id});            
            return res.json(_transformReserve(reserve));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.user;
            const reserve = await Reserve.findOne({where:{userId: id}});
            return res.json(_transformReserve(reserve));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.user;
            let {idOfFlat} = req.body;
            const reserve = await Reserve.update({idOfFlat}, {where:{userId: id}});
            return res.json(_transformReserve(reserve));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Reserve.destroy({where: {userId: req.user.id, idOfFlat: id}});
            return res.json('Reserve was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ReservesController();