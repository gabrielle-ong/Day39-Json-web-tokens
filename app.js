var express = require('express'),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose'),
app         = express();

mongoose.connect('mongodb://localhost:27017/MI6');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//insert middleware - when you access this, use expressJWT to check current token with pervious token. if matches, procceed (routing). else error.
//doesnt decrypt it, jwt decrypts it.
//app.use('/api/agents/:id', expressJWT({secret: secret}));

var routes = require('./config/routes');
app.use('/api', routes);

app.listen(3000);