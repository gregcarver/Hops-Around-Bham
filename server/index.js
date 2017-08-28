var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var jsonPath = path.join(__dirname, 'data.json');

app.use(express.static('client'))
