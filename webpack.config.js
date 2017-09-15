/* tslint:disable no-console */
var webpack = require('webpack');
var path = require('path');
var {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
var debug = process.env.NODE_ENV !== "production";

const wsLive = process.env.WS_LIVE === 'true' && process.env.LIVE === 'true';

module.exports = {
  target: 'web',
  context: __dirname,
  devtool: debug ? 'inline-source-map' : false,
  entry: ["./demo/index.tsx"],
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)(\?.*$|$)/,
        loader: 'awesome-typescript-loader',
        query: {
          useWebpackText: true,
          module: "es2015",
          target: "es5",
          lib: ['es6', 'dom'],
          useForkChecker: true
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      },
      {
        test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    plugins: [
      new TsConfigPathsPlugin()
    ],
    unsafeCache: true
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
        'ENVIRONMENT': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  node: {
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
