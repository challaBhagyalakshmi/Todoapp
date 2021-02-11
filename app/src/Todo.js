import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const inputHandler = (event) => {
        setTodo(event.target.value);
        console.log(todo);
    }
    const addTodo = async() => {
        console.log('Hello');
        await axios.post('http://localhost:3000/todoapp/add', { todoName: todo,completed:false }).then((response)=>{
            setTodos((prevTodos) => [...prevTodos, { todoName: response.data.data.todoName, completed: response.data.data.completed, id: response.data.data._id }]);
            console.log('Todos');
            console.log(todos);
        })
    }

    return (<div>
        <h1>Todo app</h1>
        <div style={{ marginLeft:300,borderWidth: 10, width: '50%', borderColor: 'black', paddingLeft: 20,borderBlockColor:'black' }}>
            <input type="text" autoFocus="true" placeholder="Enter todo" value={todo} onChange={ inputHandler} style={{ width: '30%', height: 20 }} />
            <button style={{ marginLeft: 0, backgroundColor: 'gray', color: 'white', width: '10%', height: 25 }} onClick={addTodo}>Submit</button>
        </div>
    </div>);
}

export default Todo;