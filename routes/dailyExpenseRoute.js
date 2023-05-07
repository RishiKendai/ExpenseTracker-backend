// /api/daily-expense
const router = require('express').Router();

const{
    create,
    edit,
    getAll,
    deleteExpense,
    getExpenseByDate
} = require('../controller/dailyExpenseController')

// router.get('/', getPresentExpense);
router.post('/', getExpenseByDate);
router.post('/create',create)
// router.put('/edit',edit)
// router.get('/get-all', getAll)
// router.get('get-by-date',getExpenseByDate)
// router.delete('/delete',deleteExpense)

module.exports = router