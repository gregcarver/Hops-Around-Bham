var yelp = "https://api.yelp.com/v3/businesses/search?location=birmingham&term=bar&Authorization=Bearer 3JIWB8IUDpuwym5MW0ezva3XuN2-a5aPMe6wTytPF4-TCQ3UhkCmcCwGjSQa4Vo1WYUbMoGMm0iqF_VgYMlDMaBJCR4GjaAhjJ4cQ_7ysvasl5Ho_VGJw7UZbVqcWXYx"


var app = angular.module('app',['ngRoute', 'app.controllers']);
app.config(function($routeProvider,$httpProvider){
    $routeProvider
    .when('/',{
        templateUrl: "../views/home.html"
    })
    .when('/home',{
        templateUrl: "../views/landing.html"
    })
    .when('/category',{
        templateUrl: "../views/list.html"
    })
    .when('/category/brewery',{
    templateUrl: "../views/brewery.html"
    })
    .when('/single',{
        templateUrl: "../views/single.html"
    })
    .when('/user/:user',{
        templateUrl: "../views/user-page.html"
    })
    .when('/category/type1/:category',{
    templateUrl: "../views/sportsbar.html"
})
    .when('/category/type2/:category',{
    templateUrl: "../views/cocktail.html"
})
    .when('/category/type3/:category',{
    templateUrl: "../views/brewery.html"
})
    .when('/category/type4/:category',{
    templateUrl: "../views/dive.html"
})
    .when('/category/type5/:category',{
    templateUrl: "../views/lounge.html"
    })           
});
app.run(function($rootScope){
    $rootScope.userApi = 'http://localhost:3000/api/favs/';
    $rootScope.yelpApi = 'http://localhost:3000/api/yelp/';
})














 







