'use strict';
var express = require('express');
var app = express();
const yelp = require('yelp-fusion');

app.use(express.static('client'));
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'h19Iy1e275xH__M2yfjwlw';
const clientSecret = 'szSPG6Su54FusdKOvzdx2PHZgqXRB4HPjhvl1EoUhezT8B9vT6MxNNQLQ7YgnYde';

const searchRequest = {
 term:'bar',
 location: 'birmingham'
};

yelp.accessToken(clientId, clientSecret).then(response => {
 const client = yelp.client(response.jsonBody.access_token);

 client.search(searchRequest).then(response => {
   const firstResult = response.jsonBody.businesses[0];
   const prettyJson = JSON.stringify(firstResult, null, 4);
   console.log(prettyJson);
 });
}).catch(e => {
 console.log(e);
});
app.listen(3000, function() {
    console.log('app listening on port 3000');
});