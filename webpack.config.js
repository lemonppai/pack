/**
 * 编译配置（开发环境）
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

const path = require('path');
const port = 8060;

const rootPath = require('app-root-path').path;

module.exports = {
  mode: 'development',
  context: rootPath,
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: './lib/main'
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.sass', '.scss', '.json'],
    // 简称
    alias: {
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  stats: "errors-only",

  plugins: [
    () => {
      let s = '> Listening at ' + chalk.blue(`http://localhost:${port}`);
      console.log('-'.repeat(s.length - 10))
      console.log(s);
      console.log('-'.repeat(s.length - 10))
    },
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin(),

    // 修改页面静态文件路径
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  // 代理服务器
  devServer: {
    contentBase: '/',
    host: '0.0.0.0',
    port: port,
    hot: true,
    noInfo: true,
    inline: true,
    compress: true,
    historyApiFallback: true
  }
}
