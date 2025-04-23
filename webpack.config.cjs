const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const publicPath = path.resolve(__dirname, "public");

const isProduction = process.env.NODE_ENV === "production";
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const getSettingsForStyles = (withModules = false) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProduction
                ? "[path][name]__[local]"
                : "[hash:base64]",
              namedExport: false,
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          includePaths: [path.resolve(srcPath, "styles/scss/")],
        },
      },
    },
  ];
};

module.exports = {
  entry: [path.join(srcPath, "index.tsx")],
  target: !isProduction ? "web" : "browserslist",
  devtool: isProduction ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js",
    publicPath: "/kts-ecommerce/",
  },
  module: {
    rules: [
      {
        // если файл заканчивается на .css, то вебпак должен обрабатывать его с помощью двух лоадеров, при это очень важна последовательность применяемых лоадеров сначала применяется css-loader, чтобы обработать все импортируемые стили, и потом style-loader, который вставит указанные стили в тег style
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"), // путь до нашего шаблона
      favicon: path.join(publicPath, "logo.png"),
    }),
    new ESLintWebpackPlugin({
      context: srcPath,
      extensions: [".ts", ".tsx", ".js", "jsx"],
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
    //Добавим плагин в plugins
    isProduction &&
      new MiniCssExtractPlugin({
        // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
        filename: "[name]-[hash].css",
      }),
    new TsCheckerPlugin(),
    new Dotenv(),
  ].filter(Boolean),
  resolve: {
    // теперь при импорте эти расширения файлов можно не указывать
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      assets: path.join(srcPath, "assets"),
      components: path.join(srcPath, "components"),
      config: path.join(srcPath, "config"),
      constants: path.join(srcPath, "constants"),
      hooks: path.join(srcPath, "hooks"),
      pages: path.join(srcPath, "pages"),
      services: path.join(srcPath, "services"),
      store: path.join(srcPath, "store"),
      styles: path.join(srcPath, "styles"),
      types: path.join(srcPath, "types"),
      scss: path.join(srcPath, "styles/scss/_index.scss"),
    },
  },
  devServer: {
    host: "localhost", // хост нашего сервера
    port: 3000, // порт, по которому к нему можно обращаться
    hot: true,
    // inline: true, в вебпак 5+ включено по умолчанию
    historyApiFallback: true,
    static: [
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/",
      },
    ],
  },
};
