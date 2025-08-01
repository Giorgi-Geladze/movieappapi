const router = require('express').Router();
const {
  getAll,
  create,
  update,
  remove
} = require('../controllers/commentController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { commentSchema } = require('../validators/commentValidator');

router.get('/', getAll);
router.post('/', authenticate, validateBody(commentSchema), create);
router.put('/:id', authenticate, validateBody(commentSchema), update);
router.delete('/:id', authenticate, remove);

module.exports = router;