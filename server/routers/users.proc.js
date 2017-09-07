var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, "..", 'users.json');
var favPath = path.join(__dirname, "..", 'data.json');



function getUsers() {
    //console.log('in my promise');
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }
            //console.log(file);
            resolve(JSON.parse(file));
        });
    });
}



function getUser(user) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }
            var parsed = JSON.parse(file),
                found;

            parsed.forEach(function(element) {
                if (element.username === user) {
                    found = element;
                }
            });
            if (!!found) {
                resolve(found);
            } else {
                reject('Not Found');
            }
        });
    });
}

function getUserFav(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(favPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }
            //console.log('one user favs promise');
            var parsed = JSON.parse(file),
                usersFavs = parsed.filter(function(element){
                if(element.id === id){
                    return true;
                } else {
                    return false;
                }
            });
            if (true){
               resolve(usersFavs);
               //console.log(usersFavs);
            } 
        });
    });
}

function deleteFav(locationID) {
    return new Promise(function(resolve, reject) {
        fs.readFile(favPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                isDeleted = false,
                deleteIndex;

            parsed.forEach(function(element, i) {
                if (element.locationID === locationID) {
                    isDeleted = true;
                    deleteIndex = i;
                }
            });

            if (isDeleted) {
                parsed.splice(deleteIndex, 1);

                fs.writeFile(favPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to data.json');
                    }

                    resolve('Deleted');
                });
            } else {
                reject('cannot do');
            }
        });
    });
}

module.exports = {
    all: getUsers,
    oneUser: getUser,
    userFav: getUserFav,
    destroy: deleteFav
};