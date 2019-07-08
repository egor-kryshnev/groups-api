var bodyParser = require("body-parser");
var groupValidator = require("./validations/SecurityValidator");
var InputValidator = require("./validations/InputValidator");
var groupController = require("./controllers/groupController");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post(
    "/api/createGroup",
    InputValidator.validateBodyHTMLTags,
    InputValidator.ValidateInputTypes,
    groupValidator.ValidateName,
    (req, res) => {
      groupController.CreateGroup(req, res);
    }
  );

  app.get("/api/getAllGroups", (req, res) => {
    groupController.GetAll(req, res);
  });

  app.get("/api/allGroups/getGroupsByPerson/:namePerson", (req, res) => {
    groupController.GetGroupsByPerson(req, res);
  });

  app.get("/api/allGroups/getGroupsByPersonAdmin/:namePerson", (req, res) => {
    groupController.GetGroupsByPersonAdmin(req, res);
  });

  app.get(
    "/api/allGroups/getGroupsByPersonNotAdmin/:namePerson",
    (req, res) => {
      groupController.GetGroupsByPersonNotAdmin(req, res);
    }
  );

  // app.get("/api/oneGroup", groupValidator.ValidateName, (req, res) => {
  //   console.log(req.query);
  //   if (req.query.id) {
  //     groupController.GetOneById(req, res);
  //   } else if (req.query.name) {
  //     groupController.GetOneByName(req, res);
  //   } else {
  //     res.sendStatus(400);
  //   }
  // });

  app.get("/api/getOneGroupById/:id", groupValidator.ValidateName, (req, res) => {
    // console.log(res.params);    
    groupController.GetOneById(req, res);
  });

  app.get("/api/getOneGroupByName/:name", groupValidator.ValidateName, (req, res) => {
    groupController.GetOneByName(req, res);
  });

  app.put(
    "/api/updateGroup",
    InputValidator.validateBodyHTMLTags,
    groupValidator.ValidateName,
    (req, res) => {
      groupController.Update(req, res);
    }
  );

  app.delete("/api/deleteGroup", (req, res) => {
    groupController.Delete(req, res);
  });
};
