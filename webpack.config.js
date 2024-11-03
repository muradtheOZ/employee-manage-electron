const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/renderer/index.js", // Adjust to your main React entry file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/index.html", to: "index.html" }, // Copy index.html to dist folder
      ],
    }),
  ],
};
