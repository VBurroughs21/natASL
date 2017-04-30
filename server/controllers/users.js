
const { Router } = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = new Router()

.post('/', (request, response) => {
  const { email, password, firstName, lastName } = request.body;
  const user = new User({ email, password, firstName, lastName });
  user.save()
  .then(() => {
    const userObj = user.safe();
    request.user(userObj);  // Set Session
    response.json({
      message: 'Successfully Created User.', user: userObj,
    });
  })
  .catch(response.error);
})
