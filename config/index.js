var configValues = require('./config.json');

module.exports = {

  getDbConnectionString () {
    return `mongodb://${configValues.uname}:${configValues.pwd}@ds139904.mlab.com:39904/d-node-todo`;
  }

};