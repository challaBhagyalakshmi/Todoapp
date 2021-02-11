const express = require('express');
const router = express.Router();

const { addTodo, getTodos, updateStatus, deleteTodo } = require('../controllers/todo');

router.post('/add', addTodo);
router.get('/all', getTodos);
router.put('/updateStatus', updateStatus);
router.delete('/delete', deleteTodo);

module.exports = router ;
