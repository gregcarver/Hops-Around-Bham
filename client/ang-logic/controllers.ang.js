var app = angular.module('app.controllers', ['ngRoute']);

//get list of bars controller
app.controller("BarGet",['$scope', '$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
        console.log('bars load')
        $http({
            method : 'POST',
            url : "http://localhost:3000/api/yelp",
            // headers: {
            //     'Authorization' : 'Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx',
            //     'location' : 'birmingham',
            //     'term' : 'bar'
            // }
        })
            .then(function(response){
                console.log(response.data.businesses)
                $scope.bars=response.data.businesses
    });

}])
//get bar by category
app.controller("BarGetCat",['$scope', '$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
         
        console.log('inside controllerss')
        var id=$routeParams.id;
        var categories = $routeParams.category;
        console.log($routeParams.category)
            $http({
                method : 'POST',
                url : "http://localhost:3000/api/yelp/category/" + categories,
                data: {}
            })
                .then(function(response){
                    console.log(response.data)
                    $scope.barsCat=response.data.businesses
        })
        .catch((err) => {
            console.log('err', err);
        })
        $scope.GetId= function(id){
            $location.path("/single/" + id)
            console.log(id)
        //     var id=$routeParams.id;
        //     $http.post('http://localhost:3000/api/yelp/single/'+id)
        //         .then(function(response){
        //             console.log('inside post')
        //         $scope.singleBar=response.data.businesses
        //         console.log(response)
        //     })
        //     .catch((err) => {
        //     console.log('err', err);
        // })
        }
}])
//single bar
app.controller("singleBar",['$scope', '$routeParams', '$http','$rootScope', function($scope, $routeParams, $http,$rootScope){
    console.log('inside single')
     var id=$routeParams.id;
    $http.post('http://localhost:3000/api/yelp/single/'+id)
        .then(function(response){
            console.log('inside post')
        $scope.singleBar=response.data
        // $scope.latitude=response.data.coordinates.latitude
        // $scope.longitude=reponse.data.coordinates.longitude
        console.log(response.data)
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
                marker.addListener('click', function() {
            infowindow.open(userMap, marker);
        });
    })
            .catch((err) => {
            console.log('err', err);
        })

}])
//User Page controller
app.controller('oneUserPage', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
    console.log('A user page');
    console.log($routeParams);
    var id = $routeParams.user;

    //geolocate
 
    $http.get('http://localhost:3000/api/favs/user/' +id)
    .then(function(response){
        $scope.favoriteInfo = response.data
        console.log($scope.favoriteInfo);
        $rootScope.favs = $scope.favoriteInfo;
            // User Map
        var uluru = {lat: 33.5152718, lng: -86.8170129};
        var map = new google.maps.Map(document.getElementById('userMap'), {
            zoom: 13,
            center: uluru
        });
        console.log($rootScope)
        $rootScope.favs.forEach(function(element){
            var uluru = {
                lat: element.latitude,
                lng: element.longitude
            }
            var iconImage = '../images/hop.png'
            console.log(uluru);
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
    })
    })

    $http.get('http://localhost:3000/api/favs/user')
    .then(function(response){
        console.log(response);
        response.data.forEach(function(element){
            if(element.id == id){
               $scope.User = element.username;
               console.log($scope.User);
               return $scope.User;
            }else{
                console.log('no user found');
            }
        })
        console.log($scope.User);
    })

    

}])