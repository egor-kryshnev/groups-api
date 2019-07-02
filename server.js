var express = require("express");
var app = express();
const helmet = require('helmet')
var http = require("http").Server(app);
var mongoose = require("mongoose");
var config = require("./configDB");
var router = require("./router");
const hsts = require('hsts');

var bodyParser = require("body-parser");

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}));


app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("access-Control-Allow-Origin", "*");
  next();
});

mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
router(app);

http.listen(port, function() {
  console.log("Server listening on port: " + port);
});
