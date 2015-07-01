var Models = {};
Models.AllModels = [];
Models.DynamicModels = [];
Models.StaticModels = [];

exports.initDb = function(uristring, done) {

  // Bring Mongoose into the app 
  var mongoose = require( 'mongoose' ); 

  // Build the connection string 
  var dbURI = uristring;

  // Create the database connection 
  var connection = mongoose.connect(dbURI); 

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
    initStaticModels(connection);
    done(null, connection);
  }); 

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 

};

function initStaticModels(connection) {
    // BRING IN YOUR SCHEMAS & MODELS // For example 
    ['user'].forEach(function (model) {
      var x = require("./" + model).init(connection);
      Models.StaticModels.push({model: x});
    });
}

exports.addDynamicModel = function(connection, name, schema, done) {
  require('./data').initSchema(connection, name, schema, function(err, model) {
    if (err) {done(err); return;}
    Models.DynamicModels.push({model: model});
    done(err, model);
  });
};
