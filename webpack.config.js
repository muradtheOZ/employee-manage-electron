const path = require('path');

module.exports = {
  entry: './src/renderer/index.tsx', // Entry point for your React app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Ensure this matches the location you’re using in HTML
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
