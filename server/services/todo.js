const Todo = require('../models/todo');

const insertTodo = async (params) => {
    const newTodo = new Todo({
        todoName: params.todoName,
        completed:params.completed,
    });
    const result=await newTodo.save().then(doc => {
        return doc;
    }).catch(error => {
        console.log(error);
        return error;
    })
    
    return result;
}

const fetchTodos = async () => {
    const result=await Todo.find().then(result => {
        return result;
    }).catch(error => {
        console.log(error);
        return error;
    })
    return result;
}

const deleteTodoItem = async (params) => {
    const result=await Todo.deleteOne({ _id: params.id }).then((data) => {
        return data;

    }).catch(error => {
        console.log(error);
        return error;
    })
    return result;
}

const updateTodoItem = async (params) => {
   const result=await Todo.updateOne({ _id: params.id },{todoName:params.todoName}).then((data) => {
       return data;
    }).catch(error => {
        console.log(error);
        return error;
    })
    return result;
}

const updateTodoStatus = async (params) => {
    const result=await Todo.updateOne({ _id: params.id }, { completed: !params.status }).then((data) => { 
        return data;
    }).catch(error => {
        return error;
    })
    return result;
}

module.exports = { insertTodo, deleteTodoItem, updateTodoItem, updateTodoStatus, fetchTodos };