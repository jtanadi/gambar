const path = require('path');

console.log("D", __dirname)
console.log(path.join(__dirname, "compiled"))

module.exports = {
  entry: path.join(__dirname, "compiled/index.js"),
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  }
};
