var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var Groups = require('./models/groupsModel');
var config = require('./configDB');
var router = require('./router');

var bodyParser = require('body-parser');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('access-Control-Allow-Origin', '*');
  next();
});

mongoose.connect(config.getDbConnectionString());
router(app);

http.listen(port, function(){
    console.log('listening on *: ' + port);
});