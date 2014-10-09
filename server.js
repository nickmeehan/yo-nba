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
  var services = []
  var nbaSheet = new GoogleSpreadsheet('1CmdqaWY31EQ_NAgjg635fBIzL7h5gZuxQBCJ_uvNnXc');
  nbaSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      services.push(new Service(rowData[i]))
    }
    res.send(services)
  })
});

index.get('/cnet/services.json', function(req, res) {
  var services = []
  var cnetSheet = new GoogleSpreadsheet('1pFU5GMO_1VtiP4w5rEC9O-yM54qVIVNVsui3jFQRQjo');
  cnetSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      services.push(new Service(rowData[i]))
    }
    res.send(services)
  })
});

index.get('/dramafever/services.json', function(req, res) {
  var services = []
  var cnetSheet = new GoogleSpreadsheet('1tpmeIMztrZkPMlQCANKaJQoFE6ZV3CUDuv5rPsTi6Mg');
  cnetSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      services.push(new Service(rowData[i]))
    }
    res.send(services)
  })
});




express()
  .use("/", index)
  .use("/", express.static(path.join(__dirname, 'subindex')))
  .use("/nba", index)
  .use("/nba", express.static(path.join(__dirname, 'subindex')))  
  .use("/cnet", index)
  .use("/cnet", express.static(path.join(__dirname, 'subindex')))  
  .use("/dramafever", index)
  .use("/dramafever", express.static(path.join(__dirname, 'subindex')))  
  .listen(port)
