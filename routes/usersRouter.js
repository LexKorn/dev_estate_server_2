const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть от 4 до 8 символов').isLength({min: 4, max: 8})
], usersController.register);
router.post('/login', usersController.login);
router.get('/activate/:link', usersController.activate);
router.get('/auth', authMiddleware, usersController.check);

module.exports = router;