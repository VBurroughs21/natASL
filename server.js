
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { connectDB } = require('./server/database');
const apiRoutes = require('./server/routes');

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

const mongooseConnection = connectDB(process.env.DB_URI);

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || '<mysecret>',
  secure: isProduction,  // Should be true when using https
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection }),
}));

app.use('/api', apiRoutes);

const server = http.createServer(app);
const port = isProduction ? (process.env.PORT || 80) : 3000;
server.listen(port, function (err, result) {
  if(err){
    throw err;
  }
  console.log('Server running on port ' + port);
}); 