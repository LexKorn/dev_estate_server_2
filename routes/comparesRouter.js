const Router = require('express');
const router = new Router();

const comparesController = require('../controllers/comparesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, comparesController.create);
router.get('/', authMiddleware, comparesController.getAll);
router.delete('/:id', authMiddleware, comparesController.delete);

module.exports = router;