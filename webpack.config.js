const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');


module.exports = {
  entry: {
    main: './src/index.js',
    articles: './src/pages/articles/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDev
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]', // папка в дист для изображений
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/pages/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/pages/articles/index.html',
      filename: 'articles.html',
    }),
    new WebpackMd5Hash(),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};


// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebpackMd5Hash = require("webpack-md5-hash");
// const webpack = require("webpack");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const isDev = process.env.NODE_ENV === "development";

// module.exports = {
//   entry: {
//     main: "./src/index.js",
//     articles: "./src/pages/articles/index.js"
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name]/[name].[chunkhash].js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: { loader: "babel-loader" },
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/i,
//         use: [
//           isDev
//             ? "style-loader"
//             : {
//                 loader: MiniCssExtractPlugin.loader,
//                 options: {
//                   publicPath: "../"
//                 }
//               },
//           "css-loader",
//           "postcss-loader"
//         ]
//       },
//       {
//         test: /\.(png|jpg|gif|ico|svg)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               name: "./images/[name].[ext]",
//               esModule: false
//             }
//           },
//           {
//             loader: "image-webpack-loader",
//             options: {
//               mozjpeg: {
//                 progressive: true,
//                 quality: 65
//               },
//               optipng: {
//                 enabled: false
//               },
//               pngquant: {
//                 quality: [0.65, 0.9],
//                 speed: 4
//               },
//               gifsicle: {
//                 interlaced: false
//               }
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(eot|ttf|woff|woff2)$/,
//         loader: "file-loader?name=./vendor/[name].[ext]&publicPath=../"
//       }
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name]/[name].[contenthash].css"
//     }),
//     new OptimizeCssAssetsPlugin({
//       assetNameRegExp: /\.css$/g,
//       cssProcessor: require("cssnano"),
//       cssProcessorPluginOptions: {
//         preset: ["default"]
//       },
//       canPrint: true
//     }),
//     new HtmlWebpackPlugin({
//       inject: false,
//       filename: "index.html",
//       template: "src/pages/index.html"
//     }),
//     new HtmlWebpackPlugin({
//       inject: false,
//       filename: "articles/index.html",
//       template: "src/pages/articles/index.html"
//     }),
//     new WebpackMd5Hash(),
//     new webpack.DefinePlugin({
//       NODE_ENV: JSON.stringify(process.env.NODE_ENV)
//     })
//   ]
// };
