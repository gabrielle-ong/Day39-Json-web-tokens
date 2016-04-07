var express = require('express'),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose'),
expressJWT  = require('express-jwt'),
jwt         = require('jsonwebtoken'),
app         = express();

var secret = "Iamalammailikepapayas";

mongoose.connect('mongodb://localhost:27017/MI6');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//insert middleware - when you access this, use expressJWT to check current token with pervious token. if matches, procceed (routing). else error.
//doesnt decrypt it, jwt decrypts it.
//app.use('/api/agents/:id', expressJWT({secret: secret}));

//if try to access an agent by id without the token, will give error
app.use(function (error, request, response, next){
  if ( error.name === "UnauthorizedError" ){
    response.status(401).json( {message: "You do not have access to that classified information.(token error)" });
  } else {
    response.json( {message: "Some other error" });
  }
});

app.post('/api/authorizations', function(request, response){
    //CANNOT see in browser because its a post request, not get
    //check the user credentials are right
    
    // collect info to include in the token
    var tokenInfo = {
        name: 'James Bond',
        codename: "007",
        id: "5705d079ea3d15b14edab548"  //get from terminal/localhost
    }
    
    //make a token and send it as json  
    var token = jwt.sign(tokenInfo, secret);
    response.json( {agent: tokenInfo, token: token });
})

var routes = require('./config/routes');
app.use('/api', routes);

app.listen(3000);