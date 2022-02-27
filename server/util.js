const fs = require("fs");
const path = require("path");

// const doesListExistInDir = (dir, listID) => {
//   fs.readdir(dir, (err, files) => {
//     if (err) {
//       console.error("Could not list the directory.", err);
//       process.exit(1);
//     }

//     files.forEach((file, index) => {
//       if (file.split(".json")[0] === listID) {
//         console.log("found matching listID in file: ", file);
//         return file;
//       }
//     });
//     return false;
//   });
// };

const getListFromFileName = (fileName) => {
  let filePath = path.join(__dirname, "lists", fileName);
  let file = fs.readFileSync(filePath);
  let list = JSON.parse(file);
  return list;
};

const getAllListsInDir = (dir) => {
  let lists = [];
  try {
    lists = fs.readdirSync(dir);
  } catch (err) {
    console.error(err);
  }
  return lists;
};

module.exports = { getListFromFileName, getAllListsInDir };
