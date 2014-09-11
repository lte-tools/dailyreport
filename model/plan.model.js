var mongoose = require('mongoose')
  , connection = require('./db.model').connection
  , config = require('../config');

module.exports = connection.model('plan', mongoose.Schema({
  'release': String,
  'from_year': String,
  'from_month': String,
  'to_year': String,
  'to_month': String,
  'lab_id': String
}));