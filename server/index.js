var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var api = require('./routers/api')

app.use(express.static(clientPath));
app.use(bodyParser.json({
    extended: true
}));

app.use("/api", api);

app.listen(3000, function() {
    //console.log('app listening on port 3000');
});
