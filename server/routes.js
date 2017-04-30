const { Router } = require('express');

const { sessions, users } = require('./controllers');
const { logger, errorResponder, sessionSetter } = require('./middleware');

module.exports = new Router()
.use(logger)
.use(errorResponder)
.use(sessionSetter)
.use('/sessions', sessions)
  /*
    post /     => create
    get  /me    => logged in user
  */
.use('/users', users);
  /*
    post /     => create
  */
