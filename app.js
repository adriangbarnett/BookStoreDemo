// Env
require('dotenv').config({ path: './app.env' });
const path = require('path');

// Framework
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const bodyParser = require("body-parser");

// App config
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("public"));


// bodyparser HELP: https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
// If you are using Express 4.16+ you don't have to import body-parser anymore. 
// You can do it just like this:
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: false}));

//app.set('layout',"./layouts/layout")
//app.use(expressLayouts);

// https
const https = require("https");
const { request } = require("http");


// errors
const errorHandler = require("./handlers/errorHandlers");

// Routes
const indexRouter = require('./routes/index.js');
const authorsRouter = require('./routes/authors.js');
const devRouter = require('./routes/dev.js');

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/dev', devRouter);

// Mongo DB database
const database = require("./db");

// start Server
app.listen(process.env.PORT || process.env.LOCALHOST_PORT, function() {
    
    console.log("Starting...");
    console.log('Port:', process.env.LOCALHOST_PORT);
    database.connect();

});


// /////////////////////////// put at END ///////////////////////////////

// catch 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).send("<h1>404 Not Found</h1>");
});