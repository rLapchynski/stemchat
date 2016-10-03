// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8082;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var server   = require('http').createServer(app);
var io       = require('socket.io')(server);

var configDB = require('./config/database.js');

// configuration ===============================================================

mongoose.connect(configDB.url); // connect to our database after 5 seconds

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	//app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//socket =======================================================================
require('./config/socket.js')(io); //configure socket.io

// launch ======================================================================
server.listen(port);
//app.listen(port);

console.log("Port: " + port);
