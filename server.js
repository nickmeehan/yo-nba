var express = require('express')
  , mongo = require('mongodb')
  , monk = require('monk')
  , path = require('path')
  , port = process.env.PORT || 8001
  , GoogleSpreadsheet = require("google-spreadsheet");

var index = express.Router();

index.get('/nba/services.json', function(req, res) {

  function NbaService(data) {
    this.name = data.name;
    this.username = data.username;
    this.sends_yo_when = data.saysyowhen;
    this.url = data.url;
  }

  var teams = []
  var nbaSheet = new GoogleSpreadsheet('1CmdqaWY31EQ_NAgjg635fBIzL7h5gZuxQBCJ_uvNnXc');
  nbaSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      teams.push(new NbaService(rowData[i]))
    }
    res.send(teams)
  })
});



express()
  .use("/", index)
  .use("/", express.static(path.join(__dirname, 'nba')))
  .listen(port)
