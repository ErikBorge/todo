const express = require("express");
const path = require("path");
let fs = require("fs");
const bodyParser = require("body-parser");

let filePath = path.join(__dirname, "todos.json");
let file = fs.readFileSync(filePath);
let todos = JSON.parse(file);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/todos", (req, res) => {
  res.send(todos);
});

app.post("/api/todos", (req, res) => {
  console.log("received", req.body);
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    console.log("file written successfully");
  } catch (err) {
    console.error(err);
  }
  console.log("JSON file has been saved.");
  res.send(req.body);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
