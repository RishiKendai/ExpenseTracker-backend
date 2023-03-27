// /api/user
const router = require('express').Router();

const { create, login, edit } = require('../controller/users');
/// Middleware
const { validate } = require('../middleware/validateUsers');
const { isAuth } = require('../middleware/authorization');

/// Routes
router.post('/create', validate, create);
router.post('/auth/login', login);
router.post('/edit', isAuth, edit);

module.exports = router;