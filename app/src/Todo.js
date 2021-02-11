import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/todoapp/all').then((response) => {
            const data = response.data.data.map((todo) => {
                return {
                    todoName: todo.todoName,
                    id: todo._id,
                    completed:todo.completed,
                }
            })
            console.log("data");
            console.log(data);
            setTodos(data);
        })
    })

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
        setTodo('');
    }

    return (<div>
        <h1>Todo app</h1>
        <div style={{ marginLeft: 300, borderWidth: "2px", width: '50%', 'borderStyle': 'solid', borderColor: 'black', paddingLeft: 20, borderBlockColor: 'black',}}>
            <div>
                {todos.map((todo) => {
                    return (<div>
                        <span style={{ margin: 0, height: 50, borderBottomWidth: '2px', borderBottomStyle: 'solid', width: '100%' }}>{todo.todoName}</span>
                    </div>);
                })}
            </div>
            <input type="text" autoFocus="true" placeholder="Enter todo" value={todo} onChange={ inputHandler} style={{ marginLeft:0,width:'70%',height: 20 }} />
            <button style={{ marginLeft: 0, backgroundColor: 'gray', color: 'white', width: '10%', height: 25 }} onClick={addTodo}>Submit</button>
        </div>
    </div>);
}

export default Todo;