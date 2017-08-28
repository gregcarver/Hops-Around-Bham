'use strict';
var fs = require('fs');
const ROUTER = require('express').Router();
var path = require('path');
const jsonPath = path.join(__dirname, '..', 'data.json');

ROUTER
  .get('/', function(req, res) {
      console.log('inside get for favs');
        res.sendFile(jsonPath);
    })
    .post('/', function(req, res) {
        console.log("posting a fav");
        console.log(req.body);
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.status(500);
            }
            var favData = JSON.parse(file);
            favData.push(req.body);
            fs.writeFile(jsonPath, JSON.stringify(favData), function(err, success){
                if (err) {
                    res.status(500)
                    res.send('Unable to save information.')
                } else {
                    res.status(201);
                    res.send(req.body);
                }
            });
        });
    });
module.exports = ROUTER;