[
  'user',
  'appointment',
  'assignment',
  'payment',
]
.forEach((model) => {
  require(`./${model}`);
});
