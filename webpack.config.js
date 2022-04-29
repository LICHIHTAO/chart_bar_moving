
const path = require("path");
const webpack = require("webpack");
const svgToMiniDataURI = require("mini-svg-data-uri");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpackMode = process.env.NODE_ENV || "development";

const plugins = [

  new webpack.BannerPlugin({
    banner: `
      FROM KNOWLEDGE PROJECTS BY 장 용준
    `,
  }),
  new webpack.ProvidePlugin({
    // $: "jquery",
    // jQuery: "jquery",
    // d3: "d3",
  }),
  new BundleAnalyzerPlugin(),
];

// 배포 모드인 경우 배포용 플러그인 추가
if ( webpackMode === "production" ) {
  plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name]-[contenthash].css",
        chunkFilename: "css/[id]-[contenthash].chunk.css",
      }),
  );
}
// ///////////////////////////////////


module.exports = {
  mode: webpackMode,
  devtool: "source-map",
  entry: {
    // jsPublic: "./src/jsIndex.ts",
    // cssPublic: "./src/cssIndex.ts",
    d3Public:"./src/d3Index.ts",
    d3Classtest:"./src/d3index_class.ts",
    d3Distribution:"./src/graph/distribution/distribution.ts",
    d3Percentage:"./src/graph/percentage/percentage.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    // alias: {
    //  jquery: path.resolve(__dirname, 'src/js/lib/jquery-3.2.1.js')
    // },
    extensions: [".js", ".jsx", ".tsx", ".ts", ".css", ".scss", ".svg"],
  },
  optimization: {
    minimizer: webpackMode === "production" ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ] : [],
    splitChunks: {
      cacheGroups: {
        chunks: "all",
        name: "shared",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(svg)$/, // svg 파일만 용량에 따라 url 및 bundle 파일로 관리할지 정한다.
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
                    webpackMode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "sass-loader",
        ],
        // exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  // externals: [ 'aws-sdk', /@google-cloud/ ],
  plugins: plugins,
};
