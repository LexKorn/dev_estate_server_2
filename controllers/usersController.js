const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const {User} = require('../models/models');
const mailMiddleware = require('../middlewares/mailMiddleware');

require('dotenv').config();

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};


class UsersController {
    async register(req, res) {
        try {            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Некорректный email или password", errors});
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким email уже существует!"});
            }

            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = String(Date.now());
            const user = await User.create({email, password: hashPassword, activationLink});
            await mailMiddleware.sendActivationMail(email, `${process.env.API_URL}api/users/activate/${activationLink}`);
            const token = generateJwt(user.id, user.email);
            return res.json({token});

        } catch(err) {
            return res.status(400).json({message: "Ошибка запроса... register"});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(400).json({message: "Такого пользователя нет!"});
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({message: "Пароль не совпал!"});
            }
            if (!user.isActivated) {
                return res.status(400).json({message: "Необходимо подтверждение аккаунта по email"});
            }

            const token = generateJwt(user.id, user.email);
            return res.json({token});

        } catch(err) {
            return res.status(400).json({message: "Ошибка запроса... login"});
        }
    }

    async check(req, res) {
        try {
            const token = generateJwt(req.user.id, req.user.email);
            return res.json({token});
        } catch(err) {
            return res.status(400).json({message: "Ошибка запроса... check"});
        }        
    }

    async activate(req, res) {
        const activationLink = req.params.link;
        const user = await User.findOne({where: {activationLink}});
        if (!user) {
            throw new Error('Некорректная ссылка активации');
        }

        user.isActivated = true;
        await user.save();
        return res.redirect(process.env.CLIENT_URL);
    }
};

module.exports = new UsersController();