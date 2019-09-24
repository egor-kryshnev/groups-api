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
  Users.findOne({ _id: req.body._id }, (err, user) => {
    console.log(user);
    if (err) throw err;
    if (user === null || user.length == 0) {
      var userRes = new Users(req.body);
      userRes.save(err => {
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

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(makeid(5));

exports.CreateUsersloop = function(req, res) {
  for(let i = 0; i < 19000; i++){
        
    var newUser1 = {
        fullName: makeid(5),
        personalNumber: "8495179",
        hierarchy: ["s/s//ss/s/"],
        primaryDomainUser: 
        {
        adfsUID: `${i}`,
        uniqueID: `${i}`
        },
        secondaryDomainUsers: 
        [
        {
        adfsUID: `${i}`,
        uniqueID: `${i}`
        }
        ],
        mail: "ronabet1@gmail.com",
        avatarPath: 'assets/img/guest.png'
    }
    var newUser = new Users(newUser1);
    newUser.save(err => {
        if (err) throw err;
        console.log("Saved to DB");
    });
}
  res.json({ message: "User created!" });
};

exports.getUserByName = function(req, res) {
  Users.find({ "fullName": { "$regex": `${req.params.name}`, "$options": "i" } },
    function(err,docs) { 
      console.log(docs);
      res.send(docs);
    } 
    );
}



