const router = require('express').Router();
const {
  searchMovies,
  getAll,
  getOne,
  create,
  update,
  remove
} = require('../controllers/movieController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { movieSchema } = require('../validators/movieValidator');

router.get("/search", searchMovies);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authenticate, validateBody(movieSchema), create);
router.put('/:id', authenticate, validateBody(movieSchema), update);
router.delete('/:id', authenticate, remove);

module.exports = router;