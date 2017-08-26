
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var getClientEnvironment = require('./env');
var fs = require('fs');

var publicUrl = '';
var env = getClientEnvironment(publicUrl);

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp (relativePath) {
  return path.resolve(appDirectory, relativePath);
}

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

var webpackOptions = {
  devtool: 'eval', // this is a dev optimization - need 'source-map' for production
  watch: true,
  profile: true,
  entry: {
    // Finally, this is your app's code:
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'socket.io-client',
      'socket.io-parser',
      'lodash',
      'jquery',
      'bootstrap'
    ],
    app: resolveApp('src/index.js')
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: resolveApp('public'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name]_bundle.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/'
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, '../commConfig.js')
    ]),
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),

    // Provides jQuery and other essentials.
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),

    // Seperates out jQuery, Bootstrap, React code away from our main bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  module: {
    rules: [
      // Pre loaders
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: resolveApp('src')
      },
      // Default loader: load all assets that are not handled
      // by other loaders with the url loader.
      // Note: This list needs to be updated with every change of extensions
      // the other loaders match.
      // E.g., when adding a loader for a new supported file extension,
      // we need to add the supported extension to this loader too.
      // Add one new line in `exclude` for each loader.
      //
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('src'),
        use: [{
          loader: 'babel-loader',
          options: {
            // @remove-on-eject-begin
            babelrc: false,
            presets: [require.resolve('babel-preset-react-app')],
            // @remove-on-eject-end
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
          }
        }]
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      // SCSS is CSS but with nesting, variables, and other cool features.
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // "file" loader for svg
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};

if (process.env.NODE_ENV === 'development') {
  webpackOptions.entry.app = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    resolveApp('src/index.js')
  ];
  webpackOptions.module.rules[2].use.unshift({
    loader: 'react-hot-loader/webpack'
  });
}

module.exports = webpackOptions;
