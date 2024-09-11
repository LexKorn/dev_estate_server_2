const Router = require('express');
const router = new Router();

const likesController = require('../controllers/likesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, likesController.create);
router.get('/', authMiddleware, likesController.getAll);
router.delete('/:id', authMiddleware, likesController.delete);

module.exports = router;