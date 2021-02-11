const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoName: { type: String, required: true },
    completed: { type: Boolean, required: false },
});

const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos;