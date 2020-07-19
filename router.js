var declarationController = require("./controllers/declarationController");

module.exports = function(app) {
  app.get("/api/declarations", (req, res) => {
    declarationController.GetAllDeclarations(req, res);
  });
  
  app.get("/api/declarations/getById/:id", (req, res) => {
    declarationController.GetDeclarationById(req, res);
  });
  
  app.post("/api/declarations/create", (req, res) => {
    declarationController.CreateDeclaration(req, res);
  });

  app.put("/api/declarations/update", (req, res) => {
    declarationController.Update(req, res);
  });

};
