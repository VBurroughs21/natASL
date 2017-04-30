
module.exports.logger = (request, response, next) => {
  console.log('\n', new Date());
  console.log(`${request.method.toString()} ${request.url.toString()}`, request.body);
  next();
};

module.exports.errorResponder = (request, response, next) => {
  response.error = (err) => {
    const error = err || {};
    let code;
    switch (error.name) {
    case 'ValidationError':
      code = 400;
      break;
    case 'Bad Credentials':
      code = 403;
      break;
    default:
      code = 500;
      error.name = 'Internal Server Error'
    }
    response.status(code).json({ message: error.name, error });
  }
  next();
};

module.exports.sessionSetter = (request, response, next) => {
  request.user = (user) => {
    if (user) {
      request.session._me = user;
    } else {
      return request.session._me || null;
    }
  }
  next();
};
