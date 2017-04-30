
// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '', 'index.html'));
})

app.post('/api/login', function(req, res) {
      const credentials = req.body;
      if(credentials.user==='admin' && credentials.password==='password'){

        const profile = {'user': credentials.user, 'role': 'ADMIN'};
        const jwtToken = jwt.sign(profile, jwtConfig.secret, {'expiresIn' : 5*60});  // expires in 300 seconds (5 min)
        res.status(200).json({
          id_token: jwtToken
        });

        //res.json({'user': credentials.user, 'role': 'ADMIN'});   
      }else{
        res.status(401).json({'message' : 'Invalid user/password'});
      }
});

app.post('/api/logout', function(req, res) {
    res.status(200).json({'message' : 'User logged out'});   
});