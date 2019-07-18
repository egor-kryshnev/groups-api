var Groups = require("../models/groupsModel");
var Users = require("../models/userModel");
var exports = module.exports;

exports.CreateGroup = function(req, res) {
  var group = new Groups(req.body);
  group.save(err => {
    if (err) throw err;
  });
  res.json({ message: "Group Created!" });
};

exports.GetAllGroups = function(req, res) {
  Groups.find({}, (err, groups) => {
    if (err) throw err;
    res.send(groups);
  });
};

exports.GetOneById = function(req, res) {
  Groups.findOne({ _id: req.params.id }, (err, group) => {
    var resJson = {};
    Users.find({ _id: { $in: group.people } }, (err, users) => {
      Users.find({ _id: { $in: group.admins } }, (err, admins) => {
        resJson = group;
        resJson.people = users;
        resJson.admins = admins;
        console.log(resJson);
        if (err) throw err;
        res.send(resJson);
      });
      
    });
  });
};

exports.GetOneByName = function(req, res) {
  Groups.findOne({ name: req.params.name }, (err, group) => {
    if (err) throw err;
    res.send(group);
  });
};

exports.GetGroupsByPerson = (req, res) => {
  Groups.find(
    { people: { $elemMatch: { name: req.params.namePerson } } },
    (err, groups) => {
      if (err) throw err;
      console.log(groups);
      res.send(groups);
    }
  );
};

exports.GetGroupsByPersonAdmin = (req, res) => {
  Groups.find(
    { admins: { $elemMatch: { name: req.params.namePerson} } },
    (err, groups) => {
      if (err) throw err;
      console.log(groups);
      res.send(groups);
    }
  );
};

exports.GetGroupsByPersonNotAdmin = (req, res) => {
  Groups.find(
    { people: { $elemMatch: { name: req.params.namePerson} } },
    (err, groups) => {
      if (err) throw err;
      console.log(groups);
      res.send(groups);
    }
  );
};

exports.Update = function(req, res) {
  Groups.findOne({ _id: req.body._id }, function(err, group) {
    if (err) return res.send(err);
    for (prop in req.body) {
      group[prop] = req.body[prop];
    }

    group.save(function(err) {
      if (err) return res.send(err);
      res.json({ message: "Group updated!" });
    });
  });
};
exports.Delete = function(req, res) {
  Groups.deleteOne({ _id: req.body._id }, function(err) {
    if (err) return res.send(err);
    res.json({ message: "Group Deleted!" });
  });
};
