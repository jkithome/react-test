var path = require('path');

module.exports = {
  entry: "./src/components/TodoList.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
    {
      test: /\.js$/, //Check for all js files
      use: [{
        loader: "babel-loader",
        options: { presets: ["es2015","react"] }
      }]
    }
  ]
  },
};