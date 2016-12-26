const express = require('express');
const morgan = require('morgan');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack/webpack.config');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
var pubPath = path.join(__dirname, '..', 'public/index.html');
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));






if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  // serve static assets normally
  app.use(express.static(__dirname + '/public'))

  //setup middleware
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  //handle all routes
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(pubPath));
    res.end();
  });
} 
else {
	// Serve static assets
	app.use(express.static(path.resolve(__dirname, '..', 'build')));

	// Always return the main index.html, so react-router render the route in the client
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
	});
}

module.exports = app;