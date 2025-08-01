const router = require('express').Router();
const { getAll, toggle } = require('../controllers/favoriteController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { favoriteSchema } = require('../validators/favoriteValidator');

router.get('/', authenticate, getAll);
router.post('/', authenticate, validateBody(favoriteSchema), toggle);

module.exports = router;