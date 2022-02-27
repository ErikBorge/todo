import React, { useEffect, useState } from "react";

import TodoList from "./todolist";
import {
  createTodoList,
  getAllTodoLists,
  sortListsByDateCreated,
  removeTodoList,
} from "../util/util";

const Todo = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    getLists();
  }, []);

  // useEffect(() => {
  //   console.log("current todoLists", todoLists);
  // }, [todoLists]);

  const getLists = async () => {
    let allLists = await getAllTodoLists();
    setTodoLists(sortListsByDateCreated(allLists));
  };

  const setList = (newList) => {
    setTodoLists((prev) => {
      let newLists = [...prev];
      let index = newLists.findIndex((i) => i.id === newList.id);
      newLists[index] = newList;
      return newLists;
    });
  };

  const createList = async (name) => {
    const newList = await createTodoList(name);
    let newLists = [newList, ...todoLists];
    setTodoLists(sortListsByDateCreated(newLists));
    // getLists();
  };

  const removeList = async (listID) => {
    await removeTodoList(listID);
    getLists();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName && newListName !== "") {
      createList(newListName);
      setNewListName("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <h2>Add new todo list </h2>
          <input
            name="name"
            type="text"
            value={newListName}
            onChange={({ target }) => setNewListName(target.value)}
          />
        </label>
        <input type="submit" value="add list" />
      </form>
      {todoLists &&
        todoLists.map((list) => {
          return (
            <TodoList
              key={list.id}
              list={list}
              setList={setList}
              listTitle={list.title}
              listID={list.id}
              listTodos={list.todos}
              removeList={removeList}
            />
          );
        })}
    </>
  );
};

export default Todo;
