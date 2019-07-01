var bodyParser = require('body-parser');
var Groups = require('./models/groupsModel');
var groupController = require('./controllers/groupController');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post("/createGroup", (req, res) => {
        // console.log(req.body);
        // var group = new Groups(req.body);
        // group.save( err => {
        //     if(err) throw err;
        // });
        // res.sendStatus(200);
        groupController.CreateGroup(req, res);
    });
    
    app.get("/allGroups", (req, res) => {
        // Groups.find({}, (err, groups) => {
        //     if (err) throw err;
        //     res.send(groups);
        // });
        groupController.GetAll(req, res);
    });

    app.get("/allGroups/getGroupsByPerson/:namePerson", (req, res) => {
        groupController.GetGroupsByPerson(req, res);
    });
    
    app.get("/allGroups/getGroupsByPersonAdmin/:namePerson", (req, res) => {
        groupController.GetGroupsByPersonAdmin(req, res);
    });

    app.get("/oneGroup", (req, res) => {
        console.log(req.query);
        if(req.query.id){
            groupController.GetOneById(req, res);
        } else if (req.query.name) {
            groupController.GetOneByName(req, res);
        } else {
            res.sendStatus(400);
        }

    });


  
  
    app.put("/updateGroup", (req, res) => {
        groupController.Update(req, res);
    });

    app.delete("/deleteGroup", (req, res) => {
        groupController.Delete(req, res);
    });

    

}
