var app = angular.module('app.controllers', ['ngRoute']);

//get list of bars controller
app.controller("BarGet",['$scope', '$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
        var category = $routeParams.categories
        console.log('bars load')
        $http({
            method : 'POST',
            url : "http://localhost:3000/api/yelp",
            headers: {
                'Authorization' : 'Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx',
                'location' : 'birmingham',
                'term' : 'bar'
            }
        })
            .then(function(response){
                console.log(response.data.businesses)
                $scope.bars=response.data.businesses
    });

}])

//User Page controller
app.controller('oneUserPage', ['$scope', '$http', '$location', '$rootScope', '$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
    console.log('A user page');
    console.log($routeParams);
    var id = $routeParams.user;
 
    $http.get('http://localhost:3000/api/favs/user/' +id)
    .then(function(response){
        console.log(response);
    })
}])