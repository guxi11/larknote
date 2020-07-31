const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    content: './src/scripts/content.ts',
    background: './src/scripts/background.ts',
    popup: './src/pages/popup.tsx',
    autolink: './src/scripts/autolink.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
};
