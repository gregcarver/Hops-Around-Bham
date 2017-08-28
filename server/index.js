var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');

app.use(express.static(clientPath));

app.get('/', function(req, res){
    res.send("hello server!");
});

app.listen(3000, function() {
    console.log('app listening on port 3000');
});

app.use(bodyParser.json());

app.route('/api/favs')
    .get(function(reeq, res){
        res.sendFile(jsonPath);
    })
    .post(function(req, res){
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

// app.route("/api/user/:id")
// .get(function(req, res){
//     console.log('get one user');
//     fs.readFile(jsonPath, 'utf-8', function(err, file){
//         if(err){
//             res.status(500);
//             res.send('Unable to retrieve user.')
//         }
//         var id = req.params.id;
//         console.log(id);
//         var result;
//         var data = JSON.parse(file);
//         data.forEach(function(post){
//             if (post.id === id){
//                 result = post;
//             }
//         });
//         if (result){
//             res.send(result);
//         } else {
//             res.send(404);
//         }
//     })
// })




 

 

