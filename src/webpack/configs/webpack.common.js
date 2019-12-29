import path from 'path';
import autoprefixer from 'autoprefixer';
import flexbugsfixes from 'postcss-flexbugs-fixes';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintBarePlugin from 'stylelint-bare-webpack-plugin';
import * as server from '../../server';

const isInDev = process.env.NODE_ENV !== 'production';

const filePrefix = isInDev ? '[name].bundle' : '[name].[contenthash].bundle';
const chunkPrefix = isInDev ? '[name].chunk' : '[name].[contenthash].chunk';
const imgFilename = isInDev ? '[name].[ext]' : '[name].[hash:8].[ext]';

const templatePath = './public';
const htmlIndex = 'index.html';
const htmlPluginOptions = {
  title: 'SPA SSE Rest App',
  filename: htmlIndex,
  template: path.join(templatePath, htmlIndex),
  inject: true,
  favicon: path.join(templatePath, 'favicon.ico'),
  xhtml: true
};

const commonConfig = {
  target: 'web',
  bail: true,
  context: path.resolve(__dirname, '../../../'),
  entry: ['./src/client/index.js'],
  output: {
    filename: `${filePrefix}.js`,
    chunkFilename: `${chunkPrefix}.js`,
    path: path.resolve(path.join('dist', server.clientDir)),
    publicPath: '/',
    hashDigestLength: 8
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
  },
  module: {
    strictExportPresence: true,
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      // This loader parallelizes code compilation, it is optional but
      // improves compile time on larger projects
      {
        test: /\.jsx?$/,
        include: /[\\/]src[\\/]client[\\/](?!config\.js)/,
        use: [
          { loader: 'thread-loader' },
          { loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              // This is a feature of `babel-loader` for Webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: false,
              presets: [
                ['@babel/preset-env',  {
                  forceAllTransforms: !isInDev,
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: 3,
                  debug: false
                }],
                '@babel/preset-react',
              ],
              plugins: [
                'react-hot-loader/babel',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                ['@babel/plugin-proposal-pipeline-operator', { proposal: 'fsharp' }],
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-function-bind',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-throw-expressions',
                // It's required Babel Syntax Dynamic Import Plugin to
                // Webpack Dynamic Imports work.
                '@babel/plugin-syntax-dynamic-import',
                'babel-plugin-styled-components',
              ]
            }
          },
          { loader: 'stylelint-custom-processor-loader',
            options: { emitWarning: true }
          },
          { loader: 'eslint-loader' }
        ]
      },
      // https://github.com/gaearon/react-hot-loader#webpack-plugin
      // https://github.com/gaearon/react-hot-loader/issues/1222
      // {
      //   test: /\.jsx?$/,
      //   include: /node_modules/,
      //   use: ['react-hot-loader/webpack'],
      // },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: imgFilename
            }
          }
        ]
      },
      {
        // test: /\.(css|scss)$/,
        test: /\.css$/,
        use: [
          { loader: 'css-hot-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { importLoaders: 2,  sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                flexbugsfixes,
                autoprefixer({ flexbox: 'no-2009' })
              ]
            }
          },
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     includePaths: ['./node_modules']
          //   }
          // }
        ]
      }
      // Not needed in react, but very useful in Angular projects.
      //{ test: /\.html$/, use: ['html-loader'] },
      //{ test: /\.txt$/, use: ['raw-loader'] }
    ]
  },
  // https://github.com/gaearon/react-hot-loader#react--dom
  // https://github.com/gaearon/react-hot-loader/issues/1222
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  plugins: [
    // Copies individual files, which already exist, to the build directory
    new CopyPlugin(['public/config.js']),

    // Generate an external css file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${filePrefix}.css`,
      chunkFilename: `${chunkPrefix}.css`
    }),

    // Lint styled components
    new StylelintBarePlugin({
      files: 'src/client/**/*.js',
      configFile: '.stylelintrc.yml'
    }),
    // Lint styled components
    // new StyleLintPlugin({
    //   files: ['src/client/**/*.js'],
    //   syntax: 'styled'
    // }),
    // Lint sass files
    // new StyleLintPlugin({
    //   files: ['src/client/**/*.scss'],
    //   syntax: 'scss'
    // }),
    // Default used by Webpack 4
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

export { commonConfig as default, htmlPluginOptions };
