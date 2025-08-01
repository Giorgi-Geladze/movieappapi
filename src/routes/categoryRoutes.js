const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  update,
  remove
} = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { categorySchema } = require('../validators/categoryValidator');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authenticate, authorize('admin'), validateBody(categorySchema), create);
router.put('/:id', authenticate, authorize('admin'), validateBody(categorySchema), update);
router.delete('/:id', authenticate, authorize('admin'), remove);

module.exports = router;