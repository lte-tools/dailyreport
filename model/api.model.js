var config = require('../config')
  , request = require('request')

exports.connect = function(path, params, callback) {
  request.post(config.episode_api.url + path, function(error, response, body) {
    if (error) {
      callback(error);
    }
    else if (response.statusCode != 200) {
      callback('Episode API error');
    }
    else {
      callback(null, body);
    }
  }).form(params);
}