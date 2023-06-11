// /api/expense-list
const router = require('express').Router();

const { create, edit, getAllList, setStarred, deleteList, getListName } = require('../controller/expenseListController');

router.post('/:id', getAllList);
router.post('/create/:uid', create);
// router.post('/edit/:id', edit);
router.post('/set-starred/:id', setStarred);
// router.delete('/delete/:id', deleteList);
// router.get('/get-list-name', getListName);
module.exports = router