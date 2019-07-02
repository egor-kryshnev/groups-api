var bodyParser = require('body-parser');
var groupValidator = require('./validations/SecurityValidator');
var Groups = require('./models/groupsModel');
var groupController = require('./controllers/groupController');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post("/api/createGroup", (req, res) => {groupController.CreateGroup(req, res);});

    app.get("/api/getAllGroups", (req, res) => { groupController.GetAll(req, res);});


    app.get("/api/allGroups/getGroupsByPerson/:namePerson", (req, res) => {
        groupController.GetGroupsByPerson(req, res);
    });

    app.get("/api/allGroups/getGroupsByPersonAdmin/:namePerson", (req, res) => {
        groupController.GetGroupsByPersonAdmin(req, res);
    });

    
    app.get("/api/allGroups/getGroupsByPersonNotAdmin/:namePerson", (req, res) => {
        groupController.GetGroupsByPersonNotAdmin(req, res);
    });

    app.get("/api/oneGroup", groupValidator.validateDataURLByID, (req, res) => {
        console.log(req.query);
        if(req.query.id){
            groupController.GetOneById(req, res);
        } else if (req.query.name) {
            groupController.GetOneByName(req, res);
        } else {
            res.sendStatus(400);
        }
});

    app.put("/api/updateGroup", (req, res) => {
        groupController.Update(req, res);
    });

    app.delete("/api/deleteGroup", (req, res) => {
        groupController.Delete(req, res);
    });

    
}
