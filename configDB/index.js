var configValues = require("./config");

module.exports = {
  getDbConnectionString: function() {
    // return 'mongodb://127.0.0.1:27017/groups';
    return "mongodb+srv://ronabet:asdgk456!@groups-erien.gcp.mongodb.net/test?retryWrites=true&w=majority";
  }
};
