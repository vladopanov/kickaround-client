const webpack = require("webpack");
const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const CURRENT_PATH = __dirname;
const BASE_PATH = "./";
const OUT_DIR_PATH = `${BASE_PATH}/dist`;

const setUrlLoaderOutput = folder =>
  IS_DEVELOPMENT ? `${folder}/[name].[ext]` : `${folder}/[hash].[ext]`;

const config = {
  stats: {
    modules: false
  },
  context: CURRENT_PATH,
  devtool: IS_DEVELOPMENT ? "inline-source-map" : false,
  entry: {
    app: `${BASE_PATH}/src/index.tsx`
  },
  output: {
    filename: IS_DEVELOPMENT ? "[name].js" : "[name].[chunkhash].js",
    publicPath: "./",
    path: path.join(CURRENT_PATH, OUT_DIR_PATH),
    library: "kickaround-client",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          configFile: "./tslint.json",
          failOnHint: false,
          fix: true
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=application/octet-stream&name=${setUrlLoaderOutput(
          "fonts"
        )}`
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=image/svg+xml&name=${setUrlLoaderOutput(
          "imgs"
        )}`
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: file => {
            return IS_DEVELOPMENT ? "fonts/[name].[ext]" : "fonts/[hash].[ext]";
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: `url-loader?prefix=font/&limit=5000&name=${setUrlLoaderOutput(
          "fonts"
        )}`
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: `url-loader?name=${setUrlLoaderOutput("imgs")}`,
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${BASE_PATH}/public/index.html`,
      favicon: `${BASE_PATH}/public/favicon.ico`,
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      DEBUG_MODE: IS_DEVELOPMENT
    })
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  externals: {}
};

if (IS_DEVELOPMENT) {
  config.output.publicPath = "http://localhost:3000/";
  config.devServer = {
    contentBase: OUT_DIR_PATH,
    host: "localhost",
    port: 3000,
    hot: true
  };

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
