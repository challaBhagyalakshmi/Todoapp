import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

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
    },[todo])

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

    const removeTodo = (todoItem) => {
        const newTodos = todos.filter((todo) => todo.id !== todoItem.id);
    axios.delete('http://localhost:3000/todoapp/delete', {
      data: { id: todoItem.id },
    });
    setTodos(newTodos);
    }

    const updateStatus = (todoItem) => {
        todos.map((todo) => {
          if (todo.id == todoItem.id) {
            todo.completed = !todo.completed;
          }
        });
        
        axios.put('http://localhost:3000/todoapp/updateStatus', {
          id: todoItem.id,
            completed: todoItem.completed,
        });
    };
    
    return (<div>
        <h1>Todo app</h1>
        <div style={{ marginLeft: 300, borderWidth: "2px", width: '50%', 'borderStyle': 'solid', borderColor: 'black', borderBlockColor: 'black',borderRadius:10,borderTopLeftRadius:5,borderTopRightRadius:5}}>
            <div>
                {todos.map((todo) => {
                    return (<div style={{marginLeft:0,borderBottomWidth:'2px',borderStyle:'outset',marginLeft:0,textAlign:'start'}}>
                        <Checkbox defaultChecked={ todo.completed} onClick={ ()=>updateStatus(todo)} color="primary"/>
                        <span style={{ margin: 0, height: 50,textAlign:'start' }}>{todo.todoName}</span>
                        <ClearIcon style={{ float: 'right' }}
                    onClick={() => removeTodo(todo)}/>
                    </div>);
                })}
            </div>
            <div style={{marginTop:40,marginBottom:20,marginLeft:0,float:'start'}}>
            <input type="text" autoFocus="true" placeholder="Enter todo" value={todo} onChange={ inputHandler} style={{marginLeft:0,borderWidth:'2px',borderTopWidth:'8px',borderStyle:'outset',borderColor:'brown',height: 30,width:'85%' }} />
                <button style={{ marginLeft: 10, backgroundColor: 'gray', color: 'white', width: '10%', height: 30 }} onClick={addTodo}>Submit</button>
                </div>
        </div>
    </div>);
}

export default Todo;