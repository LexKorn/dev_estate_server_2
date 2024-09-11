const Router = require('express');
const router = new Router();

const flatsController = require('../controllers/flatsController');

router.get('/', flatsController.getAll);
router.get('/:id', flatsController.getOne);

module.exports = router;