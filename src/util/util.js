export const getTasks = async () => {
  const data = await fetch("api/todos").then((response) => response.json());
  return data;
};

export const writeTasks = async (todos) => {
  const data = await fetch("api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todos),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return data;
};

export const addOrUpdateTask = (todos) => {
  return todos;
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
