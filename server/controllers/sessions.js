const { Router } = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = new Router()

.get('/me', (request, response) => {
  response.json({ message: 'Logged In User:', user: request.user() });
})

.post('/', (request, response) => {
  const { email, password } = request.body;
  User.findUserByEmailAndPassword(email, password)
  .then((user) => {
    if (!user) {
      return Promise.reject({ name: 'Bad Credentials' });
    }
    const userObj = user.safe();
    request.user(userObj);
    response.json({ message: 'Successfully Logged In.', user: userObj });
  })
  .catch(response.error);
})
