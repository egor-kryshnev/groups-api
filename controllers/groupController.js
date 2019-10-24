var Groups = require("../models/groupsModel");
var Users = require("../models/userModel");
var nodemailer = require("nodemailer");
var validator = require("email-validator");
var exports = module.exports;

exports.CreateGroup = function(req, res) {
  var group = new Groups(req.body);
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
  res.status(200).json({ message: "Group Created!" });
};

exports.GetAllGroups = function(req, res) {
  Groups.find({}, (err, groups) => {
    if (err) throw err;
    res.status(200).send(groups);
  });
};

exports.GetOneById = function(req, res) {
  Groups.findOne({ _id: req.params.id })
    .populate("people.user")
    .exec(function(err, group) {
      if (err) return handleError(err);
      res.status(200).send(group);
    });
};

exports.GetOneByName = function(req, res) {
  Groups.findOne({ name: req.params.name })
    .populate("people.user")
    .exec(function(err, group) {
      if (err) return throwError(err);
      res.status(200).send(group);
    });
};

exports.GetAllBySymbols = function(req, res) { console.log("error");
  if(req.params.name.length > 2){
    Groups.find({ "name": { "$regex": `${req.params.name}`, "$options": "i" }}, (err, groups) => {
      if (err) throw err;
      res.status(200).send(groups);
    });
  } else {
      res.status(300);
  }
} 

exports.GetGroupsByPerson = (req, res) => {
  Users.findOne({ name: req.params.namePerson }, (err, person) => {
    if (err) throw err;
    Groups.find({ people: { $elemMatch: { user: person.id } } })
      .populate("people.user")
      .exec((err, groups) => {
        if (err) throw err;
        console.log(groups);
        res.status(200).send(groups);
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
      res.status(200).send(groups);
    });
};

exports.GetGroupsByPersonNotAdmin = (req, res) => {
  Groups.find({ people: { $elemMatch: { user: req.params.id, admin: false } } })
    .populate("people.user")
    .exec((err, groups) => {
      if (err) throw err;
      // console.log(groups);
      res.status(200).send(groups);
    });
};

exports.Update = function(req, res) {
  var group = new Groups(req.body);
  Groups.updateOne({ _id: req.body._id }, group, function(err, group) {
    if (err) return res.send(err);
    console.log(group);
    for (let i = 0; i < req.body.people.length; i++) {
      var user = new Users(req.body.people[i].user);
      Users.updateOne({ _id: user._id }, user, (err, user) => {
        if (err) throw res.send(err);
        console.log(user);
      });
    }
    res.status(200).send({ message: "Group Updated!" });
  });
};

exports.Delete = function(req, res) {
  Groups.deleteOne({ _id: req.body._id }, function(err) {
    if (err) return res.send(err);
    res.status(200).json({ message: "Group Deleted!" });
  });
};

exports.SendMail = function(req, res) {
  var groupId = req.body.groupId;
  Groups.findOne({ _id: groupId })
    .populate("people.user")
    .exec((err, group) => {
      const resArr = [];
      group.people.filter(people => {
        if (validator.validate(people.user.email)) {
          resArr.push(people.user.email);
        }
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
        console.log(info);
        res.status(200).send({ message: "Email Sent! :)" });
      });
    });
};

exports.GetAllMembers = function(req, res) {
  Groups.findOne({ _id: req.params.id })
  .populate("people.user")
  .exec(function(err, group) {
    if (err) return handleError(err);
    res.status(200).send(group.people);
  });
}
