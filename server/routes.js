const { Router } = require('express');

const { sessions } = require('./controllers');
const { logger } = require('./middleware');

module.exports = new Router()
.use(logger)
.use('/sessions', sessions)
  /*
    post /     => create
    get /me    => logged in user
  */
