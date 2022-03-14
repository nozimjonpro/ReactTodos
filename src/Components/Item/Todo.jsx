import React from "react";
import "../Todos/todos.scss";

function Item({ children, todo, handleDelete, handleCheck }) {
  return (
    <li className="todos_item">
      <input
        className="todo__check"
        type="checkbox"
        data-todo-id={todo.id}
        onClick={handleCheck}
        defaultChecked={todo.icCompleted}
      />
      <span
        className="todos__span"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
      >
        {children}
      </span>
      <button
        className="todos__item-btn"
        data-todo-id={todo.id}
        onClick={handleDelete}
      >
        &times;
      </button>
    </li>
  );
}

export default Item;
