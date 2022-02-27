const express = require("express");
const path = require("path");
let fs = require("fs");
const bodyParser = require("body-parser");
const util = require("./util.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
//get all todos in a list
// app.post("/api/todos", (req, res) => {
//   let list = util.getListFromFileName(req.body.listID);
//   res.send(list);
// });

//get single todo list
app.post("/api/getTodoList", (req, res) => {
  let list = util.getListFromFileName(req.body.listID + ".json");
  res.send(list);
});

//get all todo lists
app.get("/api/getAllLists", (req, res) => {
  let lists = util.getAllListsInDir(path.join(__dirname, "lists"));
  lists.forEach((listName, index) => {
    lists[index] = util.getListFromFileName(listName);
  });
  res.send(lists);
});

//overwrite all contents of a todo list
app.post("/api/writeToList", (req, res) => {
  let filePath = path.join(__dirname, "lists", req.body.id + ".json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
  }
  res.send(req.body);
});

//Create a new todo list
app.post("/api/createTodoList", (req, res) => {
  let filePath = path.join(__dirname, "lists", req.body.id + ".json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
  }
  res.send(req.body);
});

//Remove a todo list
app.post("/api/removeTodoList", (req, res) => {
  let filePath = path.join(__dirname, "lists", req.body.listID + ".json");
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
  }
  res.send(req.body);
});

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
