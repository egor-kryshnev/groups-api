const Groups = require("../models/groupsModel");
const Users = require("../models/userModel");

exports.ValidateInputTypes = (req, res, next) => {
  var name = req.body.name;
  var peopleArr = req.body.people;
  var errCode = 0;
  for (let i = 0; i < peopleArr.length; i++) {
    let isAdmin = req.body.people[i].admin;
    let number = req.body.people[i].number;
    let Peoplename = req.body.people[i].name;
    if (
      typeof name != "string" ||
      typeof isAdmin != "boolean" ||
      typeof number != "string" ||
      typeof Peoplename != "string"
    ) {
      errCode = 1;
    }
    if (errCode) {
      res.status(400).send({
        error:
          "The properties are not by the types, name & number = string, admin = boolean"
      });
    } else {
      next();
    }
  }
  return true;
};

exports.validateBodyHTMLTags = (req, res, next) => {
  var name = req.body.name;
  var HTMLTags = "/<>[]^";
  var ArrHTMLtags = HTMLTags.split("");
  var UsersIDArr = req.body.people;
  var ArrName = name.split("");
  var errCode = 0;

  for (let x = 0; x < UsersIDArr.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (
        UsersIDArr[x].includes(ArrHTMLtags[y]) ||
        UsersIDArr[x].includes(ArrHTMLtags[y])
      ) {
        errCode = 1;
      }
    }
  }
  for (x in ArrName) {
    if (
      ArrName[x] == "/" ||
      ArrName[x] == "<" ||
      ArrName[x] == ">" ||
      ArrName[x] == "[" ||
      ArrName[x] == "]" ||
      ArrName[x] == "^"
    ) {
      errCode = 1;
    }
  }
  if (errCode) {
    res.status(400).send({ error: "HTML Tags, Access is denied!" });
    console.log("The user insert HTML Tags, Access is denied!");
  } else {
    next();
  }
};

exports.ValidateID = (req, res, next) => {
  const GroupID = req.params.id;
  Groups.countDocuments({ _id: GroupID }, function(err, countofDoc) {
    if (err || countofDoc < 1) {
      return res
        .status(404)
        .send({ message: "The ID not found, try other ID :(" });
    }
    next();
    return true;
  });
};

exports.ValidateIDByRegEx = (req, res, next) => {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  const GroupID = req.params.id;
  if (checkForHexRegExp.test(GroupID) == false) {
    return res.status(404).send({ message: "The ID is not valid :(" });
  }
  next();
  return true;
};

exports.ValidateName = (req, res, next) => {
  var name = req.params.name;
  Users.countDocuments({ name: name }, (err, countofDoc) => {
    if (err || countofDoc < 1) {
      return res
        .status(404)
        .send({ message: "The name not found, try other name :(" });
    }
    next();
    return true;
  });
};

exports.ValidateUsersIDinDB = (req, res, next) => {
  var UsersIDArr = req.body.people;
  var errCode = 0;
  var temp = 0;

  for (let x = 0; x < UsersIDArr.length; x++) {
    Users.countDocuments({ _id: UsersIDArr[x] }, function(err, countofDoc) {
      if (err) {
        errCode = 1;
      }
      temp += 1;
    });
  }
  if (err || temp < UsersIDArr.length) {
    errCode = 1;
    console.log(UsersIDArr[x]);
  }
  if (errCode == 1) {
    return res
      .status(404)
      .send({ message: "The user ID not found, try other ID :(" });
  } else {
    next();
    return true;
  }
};
