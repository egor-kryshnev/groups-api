

exports.ValidateInputTypes = (req, res, next) => {
    var name = req.body.name;
    var people = req.body.people;
    var isAdmin = req.body.people.admin;
    var number = req.body.people.number;
    var errCode = 0;
    if (
      typeof name != "string" ||
      typeof people != "object" ||
      typeof isAdmin != "boolean" ||
      typeof number != "string"
    ) {
      errCode = 1;
    }
    if (errCode) {
      res.status(400).send({error: "The properties are not by the types, name & number = string, admin = boolean"});
    } 
    else {
      next();
      return true;
    }
}

exports.VadlidateBothPersonInGroup = (req, res, next) => {
    
}