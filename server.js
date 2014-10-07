var express = require('express')
  , path = require('path')
  , port = process.env.PORT || 8001
  , GoogleSpreadsheet = require("google-spreadsheet");

var index = express.Router();

function Service(data) {
  this.name = data.name;
  this.username = data.username;
  this.sends_yo_when = data.saysyowhen;
  this.url = data.url;
}

index.get('/nba/services.json', function(req, res) {
  var teams = []
  var nbaSheet = new GoogleSpreadsheet('1CmdqaWY31EQ_NAgjg635fBIzL7h5gZuxQBCJ_uvNnXc');
  nbaSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      teams.push(new Service(rowData[i]))
    }
    res.send(teams)
  })
});

index.get('/cnet/services.json', function(req, res) {
  var teams = []
  var cnetSheet = new GoogleSpreadsheet('1pFU5GMO_1VtiP4w5rEC9O-yM54qVIVNVsui3jFQRQjo');
  cnetSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      teams.push(new Service(rowData[i]))
    }
    res.send(teams)
  })
});



express()
  .use("/", index)
  .use("/", express.static(path.join(__dirname, 'nba')))
  .use("/nba", index)
  .use("/nba", express.static(path.join(__dirname, 'nba')))  
  .use("/cnet", index)
  .use("/cnet", express.static(path.join(__dirname, 'nba')))  
  .listen(port)
