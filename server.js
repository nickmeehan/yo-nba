var express = require('express')
  , path = require('path')
  , port = process.env.PORT || 8001
  , GoogleSpreadsheet = require("google-spreadsheet");

var index = express.Router();

String.prototype.contains = function(subString) {
  return this.indexOf(subString) != -1
}

function Service(data) {
  this.name = data.name;
  this.username = data.username;
  this.sends_yo_when = data.saysyowhen;
  this.url = data.url;
}

function SubIndex(data) {
  this.urlMustContain = data.urlmustcontain;
  this.spreadsheetKey = data.spreadsheetkey;
  this.headline = data.headline;
}

index.get('/services.json', function(req, res) {
  var services = []
  var currentUrl = req.query.url
  var subIndexesSheet = new GoogleSpreadsheet('13Uzdff6JR7f6KrxaTiAqfhgAJostR4GtXb4XeX09x3s');
  subIndexesSheet.getRows( 1, function(err, rowData){
    for (var i = 0; i < rowData.length; i++) {
      var subIndex = new SubIndex(rowData[i])
      if (currentUrl.contains(subIndex.urlMustContain)) {
        var headline = subIndex.headline;
        var serviceSpreadsheet = new GoogleSpreadsheet(subIndex.spreadsheetKey)
        serviceSpreadsheet.getRows( 1, function(err, nestedRowData) {
          for (var j = 0; j < nestedRowData.length; j++) {
            services.push(new Service(nestedRowData[j]))
          }
          res.send({ headline: headline, services: services})
        })
      }
    }
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