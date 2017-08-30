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
      term: "bar",
      location: "birmingham",
      
    }).then(response => {
      res.send(response.jsonBody);
    })
  })
  
  //get by category
  .post("/category/:category",function(req,res){
  console.log(req.yelpClient);
  var params = req.params
  console.log(params.category)
  let body = req.body;
  
  req.yelpClient.search({
    term: params.category,
    location: "birmingham"
   // categories: "sportsbar" 
  }).then(response => {
    res.send(response.jsonBody);
  
  })
})
  .post("/single/:id",function(req,res){
  console.log(req.yelpClient);
  var params = req.params
  console.log(params.id)
  let body = req.body;
  
  req.yelpClient.search({
    id: params.id,
  }).then(response => {
    res.send(response.jsonBody);
  
  })
})
module.exports = ROUTER;