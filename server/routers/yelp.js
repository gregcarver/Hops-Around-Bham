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
  //  console.log(req.yelpClient);
    
    let body = req.body;
    var category = 
    
    req.yelpClient.search({
      term: category,
      location: "birmingham",
      
    }).then(response => {
      res.send(response.jsonBody);
      console.log(category)
    })
  })
module.exports = ROUTER;