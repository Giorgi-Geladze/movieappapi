const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { validateBody } = require('../middleware/validateMiddleware');
const { authSchema, loginSchema } = require('../validators/authValidator');

router.post('/register', validateBody(authSchema), register);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;