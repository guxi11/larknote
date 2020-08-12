const path = require('path');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

const config = {
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

  plugins: [],
};

module.exports = (env, argv) => {
  if (argv.mode) {
    config.mode = argv.mode;
  }
  if (argv.mode === 'development') {
    config.plugins.push(
      new ChromeExtensionReloader(),
    );
  }
  return config;
};
