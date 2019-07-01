const mongoose = require('mongoose');
var Groups = require('../models/groupsModel');
var exports = module.exports;
var config = require('../configDB');

mongoose.connect(config.getDbConnectionString());


exports.CreateGroup = function(req,res){
    console.log(req.body);
    var group = new Groups(req.body);
    group.save( err => {
        if(err) throw err;
    });
    res.json({ message: 'Group created!' });
}

exports.GetAll = function(req,res){
    Groups.find({}, (err, groups) => {
        if (err) throw err;
        res.send(groups);
    });
}

exports.GetOneById = function(req, res) {
    Groups.findOne({ _id: req.query.id}, (err, group) => {
        if (err) throw err;
        res.send(group)
    })
}

exports.GetOneByName = function(req, res) {
    Groups.findOne({ name: req.query.name}, (err, group) => {
        if (err) throw err;
        res.send(group)
    })
}

exports.GetGroupsByPerson = (req, res) => {
    Groups.find({ people: { $elemMatch: { name: req.params.namePerson } } }, (err, groups) => {
        if (err) throw err;
        console.log(groups);
        res.send(groups);
    });
}

exports.GetGroupsByPersonAdmin = (req, res) => {
    Groups.find({ people: { $elemMatch: { name: req.params.namePerson, admin: true } } }, (err, groups) => {
        if (err) throw err;
        console.log(groups);
        res.send(groups);
    });
}

exports.Update = function (req,res){
    console.log(req.body);
    
    Groups.findOne({ _id: req.body._id }, function(err, group) {
        if (err) return res.send(err);

        for (prop in req.body) 
        {
            group[prop] = req.body[prop];
        }
    
        group.save(function(err) {
            if (err)  return res.send(err);
            
            res.json({ message: 'Group updated!' });
        });
    });
}

exports.Delete = function (req, res){    
    Groups.deleteOne({ _id: req.body._id }, function(err) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted!' });
    });
}

