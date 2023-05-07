// /api/expense
const router = require('express').Router();

const {
    create,
    edit,
    getAllList,
    deleteList
} = requrie('../controller/expenseController');

router.post('/create', create);
router.put('/edit', edit);
router.get('/get-all-list', getAllList);
router.delete('/delete', deleteList);

module.exports = router
