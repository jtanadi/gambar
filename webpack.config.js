const path = require("path")

module.exports = {
  entry: path.join(__dirname, "compiled/index.js"),
  mode: "production",
  output: {
    path: path.join(__dirname),
    filename: "index.js",
  },
}
