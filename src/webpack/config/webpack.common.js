import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import flexbugsfixes from 'postcss-flexbugs-fixes';
import StylelintBarePlugin from 'stylelint-bare-webpack-plugin';

const isDevEnv = process.env.NODE_ENV !== 'production';

const filePrefix = isDevEnv ? '[name].bundle' : '[name].[contenthash].bundle';
const chunkPrefix = isDevEnv ? '[name].chunk' : '[name].[contenthash].chunk';
const imgFilename = isDevEnv ? '[name].[ext]' : '[name].[hash:8].[ext]';

const TEMPLATE_PATH = './public';
export const TITLE = 'Todos Application';
export const PUBLIC_PATH = '/';
export const HTML_INDEX = 'index.html';
export const FAVICON = path.join(TEMPLATE_PATH, 'favicon.ico');

export const htmlPluginOptions = {
  title: TITLE,
  filename: HTML_INDEX,
  template: path.join(TEMPLATE_PATH, HTML_INDEX),
  inject: true,
  favicon: FAVICON,
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
    path: path.resolve('dist'),
    publicPath: PUBLIC_PATH,
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
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      // This loader parallelizes code compilation, it is optional but
      // improves compile time on larger projects
      {
        test: /\.js$/,
        include: /[\\/]src[\\/]client[\\/]/,
        //exclude: /[\\/]node_modules[\\/](?!@material)/,
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
                '@babel/preset-react',
                ['@babel/preset-env',  {
                  forceAllTransforms: !isDevEnv,
                  modules: false,
                  // Important, @babel/polyfill still needs to be installed.
                  useBuiltIns: 'usage',
                  debug: false
                }]
              ],
              plugins: [
                'react-hot-loader/babel',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-function-bind',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-proposal-optional-catch-binding',
                // It's required Babel Syntax Dynamic Import Plugin to
                // Webpack Dynamic Imports work.
                '@babel/plugin-syntax-dynamic-import',
                'styled-components',
              ]
            }
          },
          { loader: 'stylelint-custom-processor-loader',
            options: { emitWarning: true }
          },
          { loader: 'eslint-loader' }
        ]
      },
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
  plugins: [
    // Generate an external css file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${filePrefix}.css`,
      chunkFilename: `${chunkPrefix}.css`
    }),

    // Lint styled components
    new StylelintBarePlugin({
      files: 'src/client/**/*.js'
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

export default commonConfig;
