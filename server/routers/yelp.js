'use strict';
const yelp = require('yelp-fusion');
const ROUTER = require('express').Router();
const config = require('../config/index');

ROUTER
  .use(function(req, res, next) {
    req.yelpClient = yelp.client(config.accessToken);    

    if (!req.yelpClient) {
      throw new Error();
    }

    next();
  })
  .post("/",function(req,res){
    console.log(req.yelpClient);
    let body = req.body;

    req.yelpClient.search({
      term: body.term,
      location: body.location
    }).then(response => {
      res.send(response.jsonBody);
    })
  })
module.exports = ROUTER;