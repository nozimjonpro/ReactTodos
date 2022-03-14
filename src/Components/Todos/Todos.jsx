import React from "react";
import "../Todos/todos.scss";
import Item from "../Item/Todo";

function Todos() {
  const [todos, setTodos] = React.useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  );

  const [type, setType] = React.useState("all");

  const handleDelete = (evt) => {
    const todoId = evt.target.dataset.todoId - 0;

    const filtered = todos.filter((todo) => todo.id !== todoId);

    window.localStorage.setItem("todos", JSON.stringify(filtered));

    setTodos(filtered);
  };

  const handleCheck = (evt) => {
    const todoId = evt.target.dataset.todoId - 0;

    const founTodo = todos.find((todo) => todo.id === todoId);
    founTodo.isCompleted = !founTodo.isCompleted;

    window.localStorage.setItem("todos", JSON.stringify([...todos]));

    setTodos([...todos]);
  };

  const getTodosByType = (_type, _todos) => {
    if (_type === "all") {
      return _todos;
    }

    if (_type === "completed") {
      return _todos.filter((t) => t.isCompleted);
    }

    if (_type === "active") {
      return _todos.filter((t) => !t.isCompleted);
    } else {
      return [];
    }
  };

  const setWithLocal = (_type) => {
    window.localStorage.setItem("type", type);
    setType(_type);
  };

  return (
    <main className="main">
      <section className="todos__section">
        <div className="container">
          <h1 className="todos__heading">todos</h1>
          <input
            className="todos__input"
            type="text"
            placeholder="tdodododo ..."
            onKeyUp={(evt) => {
              if (evt.code === "Enter") {
                if (!evt.target.value) {
                  return;
                }
                const newTodo = {
                  id: todos[todos.length - 1]?.id + 1 || 0,
                  title: evt.target.value.trim(),
                  isCompleted: false,
                };
                window.localStorage.setItem(
                  "todos",
                  JSON.stringify([...todos, newTodo])
                );
                setTodos([...todos, newTodo]);
                evt.target.value = null;
              }
            }}
          />
          <ul className="todos__list">
            {todos.length > 0 &&
              getTodosByType(type, todos).map((todo) => (
                <Item
                  key={todo.id}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                  todo={todo}
                >
                  {todo.title}
                </Item>
              ))}
          </ul>
          <div
            className="buttons"
            style={{ display: todos.length > 0 ? "block" : "none" }}
          >
            <span className="buttons__span"> {todos.length} items left</span>
            <button className="btn" onClick={() => setWithLocal("all")}>
              All
            </button>
            <button className="btn" onClick={() => setWithLocal("active")}>
              Active
            </button>
            <button className="btn" onClick={() => setWithLocal("completed")}>
              Completed
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Todos;
