var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var http = require('http');

var options = {
  host: '127.0.0.1',
  port: 8081,
  path: '/listSome'
};

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/disparaTestes', function (req, res) {
  console.log("Iniciando testes");
  var counter = 0;

  for (i = 0 ; i < 10 ; i++) {
    console.log("Sending request " + i);
    var req = http.get(options, function(res) {
      console.log('STATUS[' + counter + ']: ' + res.statusCode);

      // Buffer the body entirely for processing as a whole.
      var bodyChunks = [];
      res.on('data', function(chunk) {
        // You can process streamed parts here...
          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          console.log('BODY[' + counter + ']: ' + body);
          counter++;
          // ...and/or process the entire body here.
        })
    });

    req.on('error', function(e) {
      console.log('ERROR[' + i + ']: ' + e.message);
    });
  }
});

var server = app.listen(8082, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})
