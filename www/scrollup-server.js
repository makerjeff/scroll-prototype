/**
 * ScrollUp Prototype Server
 */

/* ============ MODULES ============ */
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');

// === custom modules ===

/* ============ GLOBALS ============ */

/* ============ INSTANCES ============ */
var app = express();

/* ============ MIDDLEWARE ============ */

//server static files
app.use(express.static(__dirname + "/public/"));

//enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended: true
 }));

//enable CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// = logs to node console with every transaction
//TODO Make this log to local file.
app.use(function(request, response, next){
    console.log('%s %s %s %s', request.method, request.url, request.path, colors.yellow(Date().toString()));
    next();
});

/* ============ ROUTES ============ */

//default route
app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});

// check to see if db is responding

// basic 404 catch-all middleware
app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

/* ===== START SERVER ===== */
app.listen(3000, function(){
    console.log('Working on Port 3000'.blue);
});


/* ============ HELPER FUNCTIONS ============ */
