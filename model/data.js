var Data = module.exports = {};

Data.initSchema = function(connection, name, sch, done) {
  var mongoose = require( 'mongoose' );
  var dataSchema = new mongoose.Schema(sch);
  var newlyAddedModel = connection.model(name, dataSchema);
  done(null, newlyAddedModel);
};
