var Groups = require("../models/groupsModel");
var Users = require("../models/userModel");
var nodemailer = require("nodemailer");
var exports = module.exports;

exports.CreateGroup = function(req, res) {
  var group = new Groups(req.body);
  // var people = new Users(req.body.people[0].user);
  for (let i = 0; i < req.body.people.length; i++) {
    Users.findOne({ _id: req.body.people[i].user }, (err, user) => {
      if (user == null || user == undefined) {
        var newUser = new Users(req.body.people[i].user);
        console.log(newUser);
        newUser.save(err => {
          if (err) throw err;
        });
      }
    });
  }
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
  Groups.findOne({ _id: req.params.id })
    .populate("people.user")
    .exec(function(err, group) {
      if (err) return handleError(err);
      res.send(group);
    });
};

exports.GetOneByName = function(req, res) {
  Groups.findOne({ name: req.params.name })
    .populate("people.user")
    .exec(function(err, group) {
      if (err) return throwError(err);
      res.send(group);
    });
};

exports.GetGroupsByPerson = (req, res) => {
  Users.findOne({ name: req.params.namePerson }, (err, person) => {
    if (err) throw err;
    Groups.find({ people: { $elemMatch: { user: person.id } } })
      .populate("people.user")
      .exec((err, groups) => {
        if (err) throw err;
        console.log(groups);
        res.send(groups);
      });
  });
};

/** by person id */
exports.GetGroupsByPersonAdmin = (req, res) => {
  Groups.find({ people: { $elemMatch: { user: req.params.id, admin: true } } })
    .populate("people.user")
    .exec((err, groups) => {
      if (err) throw err;
      console.log(groups);
      res.send(groups);
    });
};

exports.GetGroupsByPersonNotAdmin = (req, res) => {
  Groups.find({ people: { $elemMatch: { user: req.params.id, admin: false } } })
    .populate("people.user")
    .exec((err, groups) => {
      if (err) throw err;
      console.log(groups);
      res.send(groups);
    });
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

exports.SendMail = function(req, res) {
  var groupId = req.body.groupID;
  Groups.findOne({ _id: groupId })
    .populate("people.user")
    .exec((err, group) => {
      const resArr = [];
      group.people.filter(people => {
        resArr.push(people.user.email);
      });
      var mailOptions = {
        from: "groupshive@gmail.com", //! Sent from the T of the user
        to: resArr,
        subject: req.body.subject,
        text: req.body.text
      };
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "groupshive@gmail.com", //* ToDo: Create Exchange user
          pass: "groups1234"
        }
      });
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({ message: "Email Sent! :)" });
        }
      });
    });
};
