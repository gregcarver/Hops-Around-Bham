const ROUTER = require('express').Router();
const yelp = require('./yelp');
const favs = require('./favs');

ROUTER
  .use("/yelp", yelp)
  .use("/favs", favs);

module.exports = ROUTER;