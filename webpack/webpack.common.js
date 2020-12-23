const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('pretty-error').start();

const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(process.cwd(), 'src/index.js'),

  output: {
    path: isEnvDevelopment ? undefined : path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          isEnvDevelopment
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../../' },
              },
          'css-loader',
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },

  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new WebpackBar({
      name: 'build',
    }),
  ],

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
  },

  stats: {
    all: false,
  },

  target: 'web',
};
