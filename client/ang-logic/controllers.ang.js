var app = angular.module('app.controllers', ['ngRoute']);

app.controller('homeController', ["$rootScope", function($rootScope){
    $rootScope.hideNav = true;
}])

app.controller('landingController', ["$rootScope", function($rootScope){
    $rootScope.hideNav = false;
}])


app.controller("loginController", ['$location', '$http', '$scope', "$routeParams", "$rootScope", function($location,$http,$scope,$routeParams,$rootScope){
    var loginControl = document.getElementById("loginControl");
    var usernameInput = document.getElementById("usernameInput");
    var passwordInput = document.getElementById("passwordInput");
    $http.get('http://localhost:3000/api/favs/user')
        .then(function(response){
            $scope.userList = response.data;
        })
    $scope.seeUser = function(id){
        $location.path('/user/'+id);
    }
    $scope.LoginPage = function(){
        if(usernameInput.value === 'Cortana' && passwordInput.value !==''){
            $location.path('/user/10');
            loginControl.classList.remove("open");
            $rootScope.hideUsers = false;
        } else{
            alert('Username/Password incorrect; please verify your login and try again.');
            usernameInput.value = "";
            passwordInput.value = "";
        }
        usernameInput.value = "";
        passwordInput.value = "";
    }
}])
//get list of bars controller
app.controller("BarGet",['$scope', '$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
            $rootScope.hideNav = false;
        $http({
            method : 'POST',
            url : "http://localhost:3000/api/yelp",
        })
            .then(function(response){
                $scope.bars=response.data.businesses
    });

}])
//get bar by category
app.controller("BarGetCat",['$scope', '$http','$location','$routeParams', '$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
        $rootScope.hideNav = false;
        $rootScope.dataLoaded = false;
        var id=$routeParams.id;
        var categories = $routeParams.category;
            $http({
                method : 'POST',
                url : "http://localhost:3000/api/yelp/category/" + categories,
                data: {}
            })
                .then(function(response){
                    $scope.barsCat=response.data.businesses;
                    $rootScope.dataLoaded = true;
        })
        .catch((err) => {
            //console.log('err', err);
        })
        $scope.GetId= function(id){
            $location.path("/single/" + id)
        }
}])
//single bar
app.controller("singleBar",['$scope', '$routeParams', '$http','$rootScope', '$location', function($scope, $routeParams, $http,$rootScope,$location){
    $rootScope.hideNav = false;
    $rootScope.dataLoaded = false;
     var id=$routeParams.id;
    $http.post('http://localhost:3000/api/yelp/single/'+id)
        .then(function(response){
        $rootScope.dataLoaded = true;
        $scope.singleBar=response.data
        var uluru = {lat: $scope.singleBar.coordinates.latitude, lng: $scope.singleBar.coordinates.longitude};
        var map = new google.maps.Map(document.getElementById('userMap'), {
            zoom: 13,
            center: uluru
        });
            var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "heellllooooo"
        });
    })
            .catch((err) => {
            //console.log('err', err);
        })
$scope.saveFavorite = function(){
    //console.log("im clickin here");
    var data = ({
            id : "10",
            name : $scope.singleBar.name,
            locationID : $scope.singleBar.id,
            image_url : $scope.singleBar.image_url,
            address : $scope.singleBar.location.display_address[0],
            address1: $scope.singleBar.location.display_address[1],
            display_phone: $scope.singleBar.display_phone,
            latitude: $scope.singleBar.coordinates.latitude,
            longitude: $scope.singleBar.coordinates.longitude,
            rating : $scope.singleBar.rating
    });
    $http.post('http://localhost:3000/api/favs', data)
    };
    $scope.clicked = function(){   
        $location.path('/user/10');
    }
}])
//User Page controller
app.controller('oneUserPage', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
    $rootScope.hideNav = false;
    $rootScope.dataLoaded = true;
    var id = $routeParams.user;

    $http.get('http://localhost:3000/api/favs/user/' +id)
    .then(function(response){
        $scope.favoriteInfo = response.data
        //console.log($scope.favoriteInfo);
        $rootScope.favs = $scope.favoriteInfo;

        $scope.deleteFav = function(index, locationID){
            $rootScope.favs = $rootScope.favs.splice(index, 1);
            // //console.log($rootScope.favs);
            //console.log('inside delete');
            $http.delete('http://localhost:3000/api/favs/one/' +locationID)
            .then(function(response){
                //console.log('success');
            })
            .catch((err) => {
                //console.log(err);
            })
            //console.log(locationID);
        }




            // User Map
            //locate
            $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBClv-zTbB8Akv7LlKBA38u2VNvaTgqtow',
            {
                "homeMobileCountryCode": 310,
                "homeMobileNetworkCode": 410,
                "considerIp": "true",
            })
            //build map
            .then(function(response){
                $rootScope.location = response.data.location;
                var directionsDisplay;
                var waypts = [];
                var directionsService = new google.maps.DirectionsService();
                var directionMap;
                  directionsDisplay = new google.maps.DirectionsRenderer();
                  var myCenter = {lat: 33.5113746, lng: -86.8130575};
                  var map = new google.maps.Map(document.getElementById('userMap'), {
                      zoom: 13,
                      center: myCenter
                  });
                  directionsDisplay.setMap(map);
                  var myMarker = new google.maps.Marker({
                      position: myCenter,
                      map: map,
                      animation: google.maps.Animation.DROP
                  })

                  $rootScope.favs.forEach(function(element){
                      var uluru = {
                          lat: element.latitude,
                          lng: element.longitude
                      }
                      waypts.push({
                        location: uluru,
                        stopover: true
                    })
                      var iconImage = '../images/hop.png'
                      var marker = new google.maps.Marker({
                          position: uluru,
                          map: map,
                          animation: google.maps.Animation.DROP,
                          icon: iconImage
                      });
                      var contentString = '<div>'+'<p>'+ element.name +'</p>'+'</div>';
                      var infowindow = new google.maps.InfoWindow({
                          content: contentString
                      });
                      marker.addListener('click', function() {
                          infowindow.open(userMap, marker);
                      });
                      $rootScope.allEnd = {
                          lat: element.latitude,
                          lng: element.longitude
                      }
                  })
                  
                 
                $scope.calcRoute = function(lat, lng) {
                    var end = {
                        lat: lat,
                        lng: lng
                    }
                    var request = {
                    origin: myCenter,
                    destination: end,
                    travelMode: 'DRIVING'
                  };
                  directionsService.route(request, function(result, status) {
                    if (status == 'OK') {
                      directionsDisplay.setDirections(result);
                    }
                  });
                }
                $scope.calcAllRoute = function() {

                    var request = {
                    origin: myCenter,
                    destination: $rootScope.allEnd,
                    waypoints: waypts,
                    travelMode: 'DRIVING'
                  };
                  directionsService.route(request, function(result, status) {
                    if (status == 'OK') {
                      directionsDisplay.setDirections(result);
                    }
                  });
                }
            })
    })
    

    $http.get('http://localhost:3000/api/favs/user')
    .then(function(response){

        response.data.forEach(function(element){
            if(element.id == id){
               $scope.User = element.username;

               return $scope.User;
            }else{
            }
        })
    })

}])