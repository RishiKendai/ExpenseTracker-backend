//  /api/label

const router = require('express').Router();

const { create, edit, getAllLabels } = require('../controller/label');

/// Middleware
const { isAuth } = require('../middleware/authorization');

router.post('/create', isAuth, create);
router.post('/edit/:labelId', isAuth, edit);
router.get('/get-all', isAuth, getAllLabels);

module.exports = router;