let { todos } = require('../data/db');

exports.getTodos = (req, res) => res.json(todos);

exports.createTodo = (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: Date.now().toString(), text };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.title = req.body.title;
  res.json(todo);
};


exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.title = title;
  res.status(200).json(todo); // Return updated todo
};


exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
};
