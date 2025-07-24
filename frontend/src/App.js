import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

const API_URL = 'http://localhost:4000';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/items`);
    const data = await res.json();
    setTodos(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      setLoggedIn(true);
      fetchTodos();
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddOrUpdate = async () => {
    if (!todo.trim()) return;

    if (editId) {
      const res = await fetch(`${API_URL}/items/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todo })
      });
      const updated = await res.json();
      setTodos(todos.map(t => t.id === editId ? updated : t));
      setEditId(null);
    } else {
      const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todo })
      });
      const newItem = await res.json();
      setTodos([...todos, newItem]);
    }

    setTodo('');
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleEdit = (item) => {
    setTodo(item.title);
    setEditId(item.id);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <>
          <h2>Todos</h2>
          <input name="todo" value={todo} onChange={e => setTodo(e.target.value)} placeholder="Enter todo" />
          <button onClick={handleAddOrUpdate}>
            {editId ? 'Update' : 'Add'}
          </button>
          <ul>
            {todos.map(item => (
              <TodoItem
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

