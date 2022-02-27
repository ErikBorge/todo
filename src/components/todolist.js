import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

//import APIHelper from "../../util/APIHelper.js";
import {
  getTodoList,
  writeTasksInList,
  toggleTodo,
  removeTodo,
} from "../util/util";

const TodoList = ({
  list,
  setList,
  listTitle,
  listID,
  listTodos,
  removeList,
}) => {
  const [todoList, setTodoList] = useState(list);
  const [todo, setTodo] = useState("");
  const inputRef = useRef(false);

  useEffect(() => {
    // getTodos();
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo && todo !== "") {
      let newTodos = [
        ...list.todos,
        { id: uuidv4(), title: todo, done: false },
      ];
      writeTodos(newTodos);
      setTodo("");
      inputRef.current.focus();
    }
  };

  const getTodos = async () => {
    let responseTodos = await getTodoList(list.id);
    setList((prev) => ({ ...prev, todos: responseTodos }));
  };

  const writeTodos = async (newTodos) => {
    const responseTodos = await writeTasksInList({
      ...list,
      todos: newTodos,
    });
    const newList = { ...list, todos: responseTodos };
    setList(newList);
    // setList((prev) => ({ ...prev, todos: responseTodos }));
  };

  const toggle = (todo) => {
    let newTodos = toggleTodo(list.todos, todo);
    writeTodos(newTodos);
  };

  const remove = (todo) => {
    let newTodos = removeTodo(list.todos, todo);
    writeTodos(newTodos);
  };

  return (
    <div className="todolist">
      <button onClick={() => removeList(list.id)}>Remove list</button>
      <h3>{list.title}</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <input type="submit" value="Add todo" />
      </form>
      <h4>Todos:</h4>
      {list &&
        list.todos.length >= 1 &&
        list.todos.map((todo, key) => {
          return (
            <div
              key={key}
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo)}
              />
              &nbsp;<b>{todo.title}</b>&nbsp;
              <button onClick={() => remove(todo)}>Remove</button>
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
