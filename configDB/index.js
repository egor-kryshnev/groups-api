var configValues = require("./config");

module.exports = {
  getDbConnectionString: function() {
    return "mongodb+srv://" + configValues.uname + ":" + configValues.pwd + "@groups-erien.gcp.mongodb.net/test?retryWrites=true&w=majority";
  }
};

