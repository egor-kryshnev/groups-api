const group = require('../models/groupsModel');
var validator = require('validator');
var sanitizeHtml = require('sanitize-html');

exports.ValidateName = (req, res, next) => {
    let ReqName = req.body.name;
    // let ReqPeople = req.body.people;
    if(validator.isDataURI(ReqName) == true || validator.isMagnetURI(ReqName) == true){
        res.send({message: "Access is denied!"});
    }
    else{
        next();
    }
}

exports.validateDataURLByID