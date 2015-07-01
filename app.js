var express = require('express');
var mongoose = require( 'mongoose' );

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var Db = require('./model/db');
var Connection;
var Collections;


// DB
var uristring = 
  process.env.MONGODD_URL || 
  'mongodb://localhost/dynamicdata';

Db.initDb(uristring, function(err, conn) {
  console.log("Db initialized");
  Connection = conn;
  console.log(Connection.modelNames());
});

function lightTest(Model) {
  var test = new Model({
    userId: "Walter",
    type: "LightSensorData",
    payload: {lux: 43, timestamp: new Date() }
  });
  test.save(function (err) {
    console.log(err);
    if (!err) console.log('Success!');
  });
}

function userTest() {
  // test
  var User = require('./model/user');
  var test = new User({
    userId: "Walter" 
  });
  test.save(function (err) {
    if (!err) console.log('Success!');
  });
  console.log(test);
  updateCollections();
}

function updateCollections() {
  debugger;
}

// ROUTES
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/dataIQ', function (req, res) {
  var name = req.body.name || "";
  var schema = req.body.schema || {};

  Db.addDynamicModel(Connection, name, schema, function(err, Model) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      lightTest(Model);
    }
  });
/*
  Db.addDynamicModel(Connection, 'LightSensor', {
    userId: String,
    deviceId: String,
    companionId: String,
    type: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    payload: {
      lux: Number,
      timestamp: Date
    }
  }, function(err, Model) {
    console.log(err);
  // test
  var test = new Model({
    userId: "Walter",
    type: "LightSensorData",
    payload: {lux: 43, timestamp: new Date() }
  });
  test.save(function (err) {
    console.log(err);
    if (!err) console.log('Success!');
  });
    updateCollections();
    res.send();
  });
*/
});

app.get('/dataIQ', function(req, res) {
  res.send(Connection.modelNames());
});


// SERVER
var theport = process.env.PORT || 4444;
var server = app.listen(theport, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
