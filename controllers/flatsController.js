const {Flat} = require('../models/models');

class FlatsController {
    async getAll(req, res) {
        try {
            let {limit, page, checkFirst, checkSecond, checkedValues, region, priceMin, priceMax, areaMin, areaMax, levelMin, levelMax} = req.query;
            page = page || 1;
            limit = Number(limit) || 10;
            let offset = page * limit - limit;

            function filterObjectType(flats) {
                if ((checkFirst && checkSecond) || (!checkFirst && !checkSecond) ) {
                    return flats;
                } else if (checkFirst && !checkSecond) {
                    return flats.filter(flat => flat.object_type !== 1);
                } else if (!checkFirst && checkSecond) {
                    return flats.filter(flat => flat.object_type === 1);
                }
            }

            function filterRooms(flats) {
                if (!checkedValues.length) {
                    return flats;
                } else {
                    return flats.filter(flat => checkedValues.includes(flat.rooms));
                }
            }

            function filterRigions(flats) {
                if (!region) {
                    return flats;
                } else {
                    return flats.filter(flat => flat.region === region);
                }
            }

            function filterRanges(flats) {
                let arr = [];
                arr = flats.filter(flat => flat.price >= priceMin &price <= priceMax);
                arr = arr.filter(flat => flat.area >= areaMin &area <= areaMax);
                arr = arr.filter(flat => flat.level >= levelMin &level <= levelMax);
                return arr;
            }


            const flats = await Flat.findAndCountAll({limit, offset});
            return res.json(flats);
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const flats = await Flat.findOne({where: {id}});
            return res.json(flats);
        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new FlatsController();