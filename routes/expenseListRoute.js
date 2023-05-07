// /api/expense-list
const router = require('express').Router();

const { create, edit, getAllList, setStarred, deleteList, getListName } = require('../controller/expenseListController');

router.post('/create', create);
router.post('/edit', edit);
router.get('/get-all-list', getAllList);
router.get('/set-starred', setStarred);
router.delete('/delete/:id', deleteList);
router.get('/get-list-name', getListName);
module.exports = router