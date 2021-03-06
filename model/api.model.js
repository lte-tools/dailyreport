"use strict";
var config = require('../config'),
  request = require('request');

exports.connect = function (path, dbobject, params, callback) {
  request.post(config.episode_api.url + path + '/' + dbobject, function (error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback('Episode API error');
    } else {
      callback(null, body);
    }
  }).form(params);
};