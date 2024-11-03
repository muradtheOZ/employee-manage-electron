const path = require('path');

module.exports = {
  entry: './src/renderer/index.js', // Adjust if your main renderer file is in a different path
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundle.js
    filename: 'bundle.js', // Output filename
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,  // This rule applies to .css files
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Loaders to process CSS and Tailwind directives
      },
    ],
  },
  target: 'electron-renderer', // Make sure this is set for Electron
};
