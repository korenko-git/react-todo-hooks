require('dotenv').config();
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');

const resolvePath = (relativePath) => path.resolve(process.cwd(), relativePath);

const config = {
  mode: 'production',

  output: {
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].chunk.js',
    path: path.resolve(process.cwd(), 'build'),
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),

      new CssMinimizerPlugin(),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new FaviconsWebpackPlugin({
      logo: resolvePath(process.env.APP_ICON),
      prefix: 'static/icons/',
      favicons: {
        appName: process.env.APP_NAME,
        appShortName: process.env.APP_SHORT_NAME,
        appDescription: process.env.APP_DESCRIPTION,
        background: process.env.APP_BACKGROUND_COLOR,
        theme_color: process.env.APP_THEME_COLOR,
        start_url: '/',
      },
    }),

    new WorkboxPlugin.InjectManifest({
      swSrc: resolvePath('src/service-worker.js'),
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};

if (process.env.BUNDLE_ANALYZER) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, config);
