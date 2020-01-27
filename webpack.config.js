const path = require("path")

module.exports = {
  entry: path.join(__dirname, "compiled/index.js"),
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    library: "gambar",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
}
