import React from 'react';

function TodoItem({ item, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      {item.title}
      <button className="edit-button" onClick={onEdit}>Edit</button>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
