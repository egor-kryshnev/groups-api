var configValues = require('./config');


module.exports = {

    getDbConnectionString: function() {
        // return 'mongodb+srv://'+ configValues.uname + ':' + configValues.pwd +'@cluster0-xujl8.mongodb.net/chat';
        return 'mongodb://127.0.0.1:27017/groups';
    }

}