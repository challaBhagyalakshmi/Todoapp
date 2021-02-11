const { insertTodo, fetchTodos, updateTodoItem, updateTodoStatus, deleteTodoItem } = require('../services/todo');

const addTodo = async (req, res) => {
    try {
        if (!req.body.completed && !req.body.todoName) {
            return res.status(400).send({ message: 'Please provide all details' });
        }
        const params = {
            todoName: req.body.todoName,
            completed: req.body.completed,
        };
        const response = await insertTodo(params);
        console.log('response');
        console.log(response);
        if (response) {
            return res.status(201).send({ message: 'Successfully inserted new todo', data: response });
        }
        return res.status(400).send({message:'Failed to insert new todo'})
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
    
}

const getTodos = async (req, res) => {
    try {
        const response = await fetchTodos();
        if (response) {
            return res.status(200).send({ message: 'Successfully fetched all todos', data: response });
        }
        return res.status(400).send({message:'Failed to fetch the todos'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const params = { id: req.body.id, status: req.body.completed };
        if (!req.body.id && !req.body.completed) {
            return res.status(400).send({ message: 'Please provide todoId and status' });
        }
        const response = await updateTodoStatus(params);
        if (response) {
            return res.status(201).send({ message: 'Successfully update the todo status', data: response });
        }
        return res.status(400).send({ message: 'Failed to update the todo status' });
    }catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const params = { id: req.body.id };
        if (!params.id) {
            return res.status(400).send({ message: 'Please provide todo id' });
        }
        const response = await deleteTodoItem(params);
        if (response) {
            return res.status(204).send({ message: 'Successfully remove the todo', data: response });
        }
        return res.status(400).send({ message: 'Failed to delete the todo item' });
    }catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = { addTodo, updateStatus, getTodos, deleteTodo };