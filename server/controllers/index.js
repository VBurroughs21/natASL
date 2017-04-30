
[
  'sessions',
]
.forEach((controller) => {
  module.exports[controller] = require(`./${controller}`);
});
