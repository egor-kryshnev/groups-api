const group = require("../models/groupsModel");
var validator = require("validator");
var sanitizeHtml = require("sanitize-html");

exports.ValidateName = (req, res, next) => {
  let ReqName = req.body.name;
  console.log(ReqName);
  if (
    validator.isDataURI(ReqName) == true ||
    validator.isMagnetURI(ReqName) == true
  ) {
    res.send({ message: "Access is denied!" });
  
  } else if (validator.isCurrency(ReqName, false) == true) {
    // res.send({ message: "Access is denied!" });
  } else {
    
    next();
  }
};

// exports.validateBodyHTMLTags = (req, res, next) => {
//     if ((str===null) || (str==='')){
//        return false;
//     }
//     else {
//     str = str.toString();
//     }
//   return str.replace(/<[^>]*>/, '');
// }
