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
app.use(bodyParser.json({ limit : '50mb'}));
app.use(bodyParser.urlencoded({ limit : '50mb', extended : true}));
//app.set('layout',"./layouts/layout")
//app.use(expressLayouts);

// https
const https = require("https");
const { request } = require("http");


// errors
const errorHandler = require("./handlers/errorHandlers");

// Routes
const indexRouter = require('./routes/index.js');
const apiRouter = require('./routes/api.js');

app.use('/', indexRouter);
app.use('/api', apiRouter);

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