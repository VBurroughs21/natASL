
[
  'sessions',
  'users',
]
.forEach((controller) => {
  module.exports[controller] = require(`./${controller}`);
});
