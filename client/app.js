var yelp = "https://api.yelp.com/v3/businesses/search?location=birmingham&term=bar&Authorization=Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx"


var app = angular.module('app',['ngRoute', 'app.controllers']);
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
    .when('/single',{
        templateUrl: "../views/single.html"
    })   
});














 







