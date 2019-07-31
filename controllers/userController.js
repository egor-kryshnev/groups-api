var Users = require("../models/userModel");
var exports = module.exports;

exports.CreateUser = function(req, res) {
  var user = new Users(req.body);
  user.save(err => {
    if (err) throw err;
  });
  res.json({ message: "User created!" });
};

exports.GetAllUsers = function(req, res) {
  Users.find({}, (err, Users) => {
    if (err) throw err;
    res.send(Users);
  });
};

exports.CheckUser = function(req, res) {
  // console.log("1");
  // console.log(req.body._id);
  Users.findOne({ _id: req.body._id }, (err, user) => {
    if (err) throw err;
    if (user.length == 0) {
      var user = new Users(req.body);
      user.save(err => {
        if (err) throw err;
      });
      res.json({ message: "User created!" });
    } else {
      res.send(user);
    }
  });
};

exports.UpdateUser = function(req, res) {
  var user = new Users(req.body);
  Users.updateOne({ _id: req.body._id }, user, function(err, User) {
    if (err) return res.send(err);
    res.send({ message: "User Updated!" });
  });
};
