var express = require("express");
var app = express();
const helmet = require("helmet");
var http = require("http").Server(app);
var mongoose = require("mongoose");
var config = require("./configDB");
var router = require("./router");
var spike = require("./spike");
const hsts = require("hsts");
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000;

class Server {
  constructor() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    this.app = express();
    this.app.listen(port, function() {
      console.log("Server listening on port: " + port);
    });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.frameguard());
    this.app.use(
      hsts({
        maxAge: 15552000 // 180 days in seconds
      })
    );
    this.app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header("access-Control-Allow-Origin", "*");
      next();
    });
    // spike();
    router(this.app);
    mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
  }
}

module.exports.Server = Server;
const server = new Server();
