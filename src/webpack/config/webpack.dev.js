import webpack from 'webpack';
import merge from 'webpack-merge';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import commonConfig, { htmlPluginOptions } from './webpack.common.js';

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
  ],
  plugins: [
    // Recompile only updated code without vendor
    new HardSourceWebpackPlugin(),

    // Detects circular dependencies
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin(htmlPluginOptions),

    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
  ],
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
});

export default devConfig;
