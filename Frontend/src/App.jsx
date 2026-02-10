
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend on mount
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/todos', { text });
      setTodos([...todos, res.data]);
      setText('');
    } catch (err) {
      console.error('Error adding todo:', err.message);
    }
  };

  // Toggle completed status
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error toggling todo:', err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err.message);
    }
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            value={text}
            placeholder="Add your task..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTodo();
            }}
          />
          <button onClick={addTodo} className="add">Add</button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={todo.completed ? 'checked' : ''}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling when clicking delete
                  deleteTodo(todo._id);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
