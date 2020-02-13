/* eslint-disable no-console */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const manifest = require("../manifest.json");

const DIST_DIR = path.resolve(__dirname, "..", "dist");

const createConfig = mode => ({
  mode,
  entry: {
    popup: path.resolve(__dirname, "../popup/index.tsx"),
    background: path.resolve(__dirname, "../background/index.ts"),
    injected: path.resolve(__dirname, "../injected/index.ts")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[contenthash].js",
    path: DIST_DIR,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js)|(tsx?)$/,
        loader: "babel-loader",
        options: { rootMode: "upward" }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["popup"],
      filename: "popup.html",
      title: manifest.name
    }),

    new CopyPlugin([
      {
        from: path.resolve(
          __dirname,
          "../../lesspass-web-extension/extension/icons"
        ),
        to: path.resolve(DIST_DIR, "icons")
      },
      {
        from: path.resolve(__dirname, "../manifest.json"),
        to: DIST_DIR
      }
    ])
  ],

  devtool: false
});

module.exports = createConfig(process.env.NODE_ENV || "development");
