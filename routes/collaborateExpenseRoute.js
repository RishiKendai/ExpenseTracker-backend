// /api/collaborate-expense
const router = require('express').Router();

const {
    create,
    edit,
    getAll,
    deleteExpense,
    addMember,
    removeMember
} = '../controller/collaborateExpenseController'

router.post('/create', create);
router.post('/edit', edit);
router.get('/get-all', getAll);
router.get('/add-member', addMember);
router.get('/remove-member', removeMember);
router.delete('/delete/:id', deleteExpense);
module.exports = router