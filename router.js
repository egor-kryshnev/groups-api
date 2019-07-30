var bodyParser = require("body-parser");
var groupValidator = require("./validations/SecurityValidator");
var InputValidator = require("./validations/InputValidator");
var groupController = require("./controllers/groupController");
var userController = require("./controllers/userController");
var userValidator = require("./validations/UserValidator");


module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post(
    "/api/createGroup",
    InputValidator.ValidateInputTypes,
    InputValidator.validateBodyHTMLTags,
    // groupValidator.ValidateName,
    // InputValidator.ValidateUsersIDinDB,
    (req, res) => {
      groupController.CreateGroup(req, res);
    }
  );

  app.get("/api/getAllGroups", (req, res) => {
    groupController.GetAllGroups(req, res);
  });

  app.get("/api/allGroups/getGroupsByPerson/:namePerson", (req, res) => {
    groupController.GetGroupsByPerson(req, res);
  });

  app.get("/api/allGroups/getGroupsByPersonAdmin/:id", (req, res) => {
    groupController.GetGroupsByPersonAdmin(req, res);
  });

  app.get("/api/allGroups/getGroupsByPersonNotAdmin/:id", (req, res) => {
    groupController.GetGroupsByPersonNotAdmin(req, res);
  });

  app.get(
    "/api/getOneGroupById/:id",
    InputValidator.ValidateID,
    InputValidator.ValidateIDByRegEx,
    (req, res) => {
      groupController.GetOneById(req, res);
    }
  );

  app.get(
    "/api/getOneGroupByName/:name",
    // InputValidator.ValidateName,
    (req, res) => {
      groupController.GetOneByName(req, res);
    }
  );

  app.put(
    "/api/updateGroup",
    // InputValidator.validateBodyHTMLTags,
    // groupValidator.ValidateName,
    (req, res) => {
      groupController.Update(req, res);
    }
  );

  app.delete("/api/deleteGroup", (req, res) => {
    groupController.Delete(req, res);
  });

  app.post("/api/sendEmail", (req, res) => {
    // InputValidator.ValidateMail(req, res);
    groupController.SendMail(req, res);
  });

  //* User Router *\\

  app.post(
    "/api/createUser",
    userValidator.ValidateInputTypes,
    userValidator.validateBodyHTMLTags,
    groupValidator.ValidateName,
    (req, res) => {
      userController.CreateUser(req, res);
    }
  );

  app.get("/api/getAllUsers/", (req, res) => {
    userController.GetAllUsers(req, res);
  });

  app.post('/api/checkUser', (req, res) => {
    userController.CheckUser(req, res);
  })
};
