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
  var peopleArr = req.body.people;
  var errCode = 0;
  var ArrName = name.split("");

  for (let x = 0; x < peopleArr.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (
        peopleArr[x].name.includes(ArrHTMLtags[y]) ||
        peopleArr[x].number.includes(ArrHTMLtags[y])
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
