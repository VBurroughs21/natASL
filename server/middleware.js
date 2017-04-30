
module.exports.logger = (request, response, next) => {
  console.log('\n', new Date());
  console.log(`${request.method.toString()} ${request.url.toString()}`, request.body);
  next();
};
