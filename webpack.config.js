const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "favicon.js",
    path: path.resolve(__dirname, "dist"),
    library: "Favicon",
    libraryTarget: "umd"
  }
};
