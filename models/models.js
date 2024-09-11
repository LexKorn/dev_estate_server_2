const sequelize = require('../db');
const {DataTypes, Model} = require('sequelize');

class Flat extends Model {};

Flat.init(
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, allowNull: false},
        date: {type: DataTypes.STRING, allowNull: false},
        time: {type: DataTypes.STRING, allowNull: false},
        geo_lat: {type: DataTypes.DOUBLE, allowNull: false},
        geo_lon: {type: DataTypes.DOUBLE, allowNull: false},
        region: {type: DataTypes.BIGINT, allowNull: false},
        building_type: {type: DataTypes.BIGINT, allowNull: false},
        object_type: {type: DataTypes.BIGINT, allowNull: false},
        level: {type: DataTypes.BIGINT, allowNull: false},
        levels: {type: DataTypes.BIGINT, allowNull: false},
        rooms: {type: DataTypes.BIGINT, allowNull: false},
        area: {type: DataTypes.DOUBLE, allowNull: false},
        kitchen_area: {type: DataTypes.DOUBLE, allowNull: false},
        price: {type: DataTypes.BIGINT, allowNull: false}
    },
    {
        sequelize,
        modelName: 'flat'
    }
);

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    isActivated: {type: DataTypes.BOOLEAN, default: false},
    activationLink: {type: DataTypes.STRING}
});

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idOfFlat: {type: DataTypes.INTEGER, allowNull: false}
});

const Compare = sequelize.define('compare', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idOfFlat: {type: DataTypes.INTEGER, allowNull: false}
});

const Reserve = sequelize.define('reserve', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idOfFlat: {type: DataTypes.INTEGER}
});

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    sender: {type: DataTypes.STRING, allowNull: false}
});

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Compare);
Compare.belongsTo(User);

User.hasOne(Reserve);
Reserve.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User);


module.exports = {
    Flat,
    User,
    Like,
    Compare,
    Reserve,
    Message
};