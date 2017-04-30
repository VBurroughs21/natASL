import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';

import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.config.json';

import { connectDB } from './server/database';
import apiRoutes from './server/routes';

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();


// Webpack dev server
if (isDeveloping) {
  const WEBPACK_PORT = 3001;
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:'+WEBPACK_PORT);
  });
}

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(publicPath));


app.use('/api', apiRoutes);

// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);

const port = isProduction ? (process.env.PORT || 80) : 3000;
server.listen(port, function (err, result) {
  if(err){
    throw err;
  }
  connectDB(process.env.DB_URI);
  console.log('Server running on port ' + port);
}); 