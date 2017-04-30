import { Router } from 'express';


export default new Router()
.use((request, response, next) => {
  console.log('\n', new Date());
  console.log(`${request.method.toString()} ${request.url.toString()}`, request.body);
  next();
})
.get('/', (request, response) => {
  response.send('Api');
})
// define the about route
.get('/about', (request, response) => {
  response.send('About birds')
});
