import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import commonConfig, { htmlPluginOptions } from './webpack.common.js';

const webpackConfig = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      // Minify the code.
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        sourceMap: true,
        extractComments: true,
        terserOptions: {
          compress: {
            warnings: true,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          },
          ecma: 8,
          warnings: true,
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // Remove/clean your build folder(s) before building
    new CleanWebpackPlugin(),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin(
      Object.assign(htmlPluginOptions, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
    ),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({ fileName: 'asset-manifest.json' }),

    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: path.join(
        commonConfig.output.publicPath,
        htmlPluginOptions.filename
      ),
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
    }),

    // Generate the 'manifest.json' for the Progressive Web Application,
    // with auto icon resizing and fingerprinting support.
     new WebpackPwaManifest({
      // manifest.json provides metadata used when your web app is added to the
      // homescreen on Android.
      // See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
      name: htmlPluginOptions.title,
      short_name: 'TodosApp',
      background_color: '#fff',
      theme_color: '#000',
      start_url: commonConfig.output.publicPath,
      icons: [{
        src: htmlPluginOptions.favicon,
        sizes: [16, 24, 32, 64],
      }]
    }),

    // Provide `process.env.PUBLIC_URL` to your app in JavaScript.
    new webpack.DefinePlugin({
      // Omit trailing slash as ${process.env.PUBLIC_URL}/xyz
      // looks better than ${process.env.PUBLIC_URL}xyz.
      'process.env.PUBLIC_URL': JSON.stringify(
        commonConfig.output.publicPath.slice(0, -1)
      )
    }),

    // Generate an HTML5 Application Cache for a Webpack build manifest.appcache
    // new AppCachePlugin({ exclude: ['.htaccess'] }),

    // Default used by Webpack 4
    //new UglifyJsPlugin(/* ... */),
    //new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    //new webpack.optimize.ModuleConcatenationPlugin(),
    //new webpack.NoEmitOnErrorsPlugin()
  ]
});

export default webpackConfig;
