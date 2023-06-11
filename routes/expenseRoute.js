// /api/expense
const router = require('express').Router();

const {
    create,
    // edit,
    getAllList,
    // deleteList
    insights,
} = require('../controller/expenseController');

router.post('/create', create);
router.post('/insights', insights);
// router.put('/edit', edit);
router.post('/get-all-list/:id', getAllList);
// router.delete('/delete', deleteList);

module.exports = router
