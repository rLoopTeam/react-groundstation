
module.exports = function () {
  var configFilename = 'config/commConfig.js';

  function writeCommConfig (data) {
    var fs = require('fs');
    fs.writeFile(configFilename, 'module.exports = ' + JSON.stringify(data, null, 2), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('Saved commConfig.');
    });
  }

  return {
    writeCommConfig
  };
};
