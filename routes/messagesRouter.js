const Router = require('express');
const router = new Router();

const messagesController = require('../controllers/messagesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, messagesController.create);
router.get('/', authMiddleware, messagesController.getAll);
router.delete('/', authMiddleware, messagesController.deleteAll);

module.exports = router;