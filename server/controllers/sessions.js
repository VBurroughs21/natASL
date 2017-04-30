
const { Router } = require('express');

module.exports = new Router()

.get('/me', (request, response) => {
  response.json(request.session.user);
})

.post('/', (request, response) => {
  request.session.user = { name: request.body.name };
  response.send('Successfully Logged In')
})


