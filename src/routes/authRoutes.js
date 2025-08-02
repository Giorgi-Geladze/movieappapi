const router = require('express').Router();
const { register, login, changePassword } = require('../controllers/authController');
const { validateBody } = require('../middleware/validateMiddleware');
const { authSchema, loginSchema } = require('../validators/authValidator');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', validateBody(authSchema), register)
router.post('/login', validateBody(loginSchema), login)

router.put('/change-password', authenticate, changePassword)

module.exports = router