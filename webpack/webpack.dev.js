require('dotenv').config();
const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    host: ip.address(),
    port: 8080,
    disableHostCheck: true,
    open: true,
    compress: true,
    hot: true,
    stats: 'errors-only',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new CleanTerminalPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve(process.cwd(), process.env.APP_ICON),
      prefix: 'static/icons/',
    }),
  ],

  devtool: 'cheap-module-source-map',

  performance: {
    hints: false,
  },
});
