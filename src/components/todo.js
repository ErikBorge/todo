import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

//import APIHelper from "../../util/APIHelper.js";
import { getTasks, writeTasks, toggleTodo, removeTodo } from "../util/util";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const inputRef = useRef(false);

  useEffect(() => {
    //console.log(todo);
    getTodos();
  }, []);

  useEffect(() => {
    console.log("todos", todos);
    //writeTodos();
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setTodos((prev) => [...prev, { title: todo, done: false }]);
    let newTodos = [...todos, { id: uuidv4(), title: todo, done: false }];
    writeTodos(newTodos);
    setTodo("");
    inputRef.current.focus();
  };

  const getTodos = async () => {
    setTodos(await getTasks());
  };

  const writeTodos = async (newTodos) => {
    const responseTodos = await writeTasks(newTodos);
    setTodos(responseTodos);
    // getTodos();
  };

  const toggle = (todo) => {
    let newTodos = toggleTodo(todos, todo);
    writeTodos(newTodos);
  };

  const remove = (todo) => {
    let newTodos = removeTodo(todos, todo);
    writeTodos(newTodos);
  };

  return (
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <input type="submit" value="add" />
      </form>
      Todos:
      {todos.length >= 1 &&
        todos.map((todo, key) => {
          return (
            <div key={key}>
              <li>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => {
                    toggle(todo);
                  }}
                />
                {todo.title}
                <button onClick={() => remove(todo)}>x</button>
              </li>
            </div>
          );
        })}
    </div>
  );
};

export default Todo;
