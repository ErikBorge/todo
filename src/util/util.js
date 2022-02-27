import { v4 as uuidv4 } from "uuid";

export const createTodoList = async (title) => {
  const data = await fetch("api/createTodoList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      id: uuidv4(),
      createdAt: Date.now(),
      todos: [],
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data;
};

// export const getTasksInList = async (listID) => {
//   const data = await fetch("api/todos").then((response) => response.json());
//   return data;
// };

export const getAllTodoLists = async () => {
  console.log("getting all lists");
  const data = await fetch("api/getAllLists")
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data;
};

export const getTodoList = async (listID) => {
  const data = await fetch("api/getTodoList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listID: listID }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data.todos;
};

export const writeTasksInList = async (fileData) => {
  const data = await fetch("api/writeToList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fileData),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data.todos;
};

export const removeTodoList = async (listID) => {
  const data = await fetch("api/removeTodoList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listID: listID }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data;
};

export const toggleTodo = (todos, todo) => {
  let newTodos = todos;
  newTodos[newTodos.findIndex((i) => i.id === todo.id)].done = !todo.done;
  return newTodos;
};

export const removeTodo = (todos, todo) => {
  let newTodos = todos;
  newTodos.splice(
    newTodos.findIndex((i) => i.id === todo.id),
    1
  );
  return newTodos;
};

export const sortListsByDateCreated = (lists) => {
  let newLists = lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return newLists;
};
