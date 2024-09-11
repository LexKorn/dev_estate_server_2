const {Like} = require('../models/models');

const _transformLike = (like) => {
    return {
        id: like.id,
        idOfFlat: like.idOfFlat,
        userId: like.userId
    }
};

class LikesController {
    async create(req, res) {
        try {
            const {id} = req.user;
            let {idOfFlat} = req.body;

            const like = await Like.create({idOfFlat, userId: id});            
            return res.json(_transformLike(like));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const {id} = req.user;
            const likes = await Like.findAll({where:{userId: id}});
            return res.json(likes.map(like => _transformLike(like)));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Like.destroy({where: {userId: req.user.id, idOfFlat: id}});
            return res.json('Like was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new LikesController();