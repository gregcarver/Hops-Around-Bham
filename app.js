var yelp = "https://api.yelp.com/v3/businesses/search?location=birmingham&term=bar&Authorization=Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx"


var app = angular.module('app',["ngRoute"]);
app.config(function($routeProvider,$httpProvider){
    $routeProvider
    .when('/',{
        templateUrl: "../views/home.html"
    })
    .when('/category',{
        templateUrl: "../views/list.html"
    })
    .when('/category/brewery',{
    templateUrl: "../views/brewery.html"
})
    .when('/category/cocktail',{
        templateUrl: "../views/cocktail.html"
    })
    .when('/category'+id,{
        templateUrl: "../views/single.html"
    })   
});
app.run(function($http){
     $http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
     $http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, POST,OPTIONS";
     $http.defaults.headers.common['Access-Control-Allow-Headers'] = "Authorization";
})

app.controller("BarGet",['$scope', '$http','$location',function($scope,$http,$location,$httpProvider){

        console.log('bars load')
        $http({
            method : 'GET',
            url : yelp,
            headers: {
                'Authorization' : 'Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx',
                'location' : 'birmingham',
                'term' : 'bar'
            }
        })
            .then(function(response){
                console.log(response.data)
                $scope.bars=response.data         
    });

}])











 
// app.controller("BarCategory",['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
//     console.log($routeParams)
//      var category=$routeParams.categories;
//     $http.get(yelp+ category)
//         .then(function(response){
//         console.log(response)
//         $scope.bars=response.data
//     });
// }]);






