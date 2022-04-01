import logo from './logo.svg';
import './Title.scss';
import Todo from './Todo';
import Bar from './Bar';
import {v4 as uuidv4} from 'uuid';
import { useState, useEffect } from "react";

let LSKEY = 'MyTodoApp';

const Title = () => {
  let initialTodos = [];

  const [todos, setTodos] = useState(() => {
    initialTodos = JSON.parse(localStorage.getItem(LSKEY + ".todos"));
    return initialTodos || [];
  });

  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([])

  const filterHandler = () => { 
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
    }
  }
  
  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), todo, completed: false }]);
  }
  
  const completeTodo = (todo) => {
    let goodTodo = todos.find(x => x.id === todo.id)
    goodTodo.completed = !goodTodo.completed;
    setTodos([...todos])
    
  }

  useEffect(() => {
    window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
  },[todos]);
  useEffect(() => {
    filterHandler();
  }, [todos,status]);
  
  return (
    <div className="Title">
      <h1>Todos</h1>
      <Bar addTodo={addTodo}/>
      <Todo completeTodo={completeTodo} setStatus={setStatus} setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default Title;
