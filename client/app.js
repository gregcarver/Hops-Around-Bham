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
    .when('/single/:id',{
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
app.filter('phoneNumber', function () {
        return function (number) {
            if (!number) { return ''; }
            number = String(number);
            number = number.replace(/[^0-9]*/g, '');
            var formattedNumber = number;
 
            var c = (number[0] == '1') ? '1' : '';
            number = number[0] == '1' ? number.slice(1) : number;
 
            var area = number.substring(0, 3);
            var front = number.substring(3, 6);
            var end = number.substring(6, 10);
 
            if (front) {
                formattedNumber = (c + "(" + area + ") " + front);
            }
            if (end) {
                formattedNumber += ("-" + end);
            }
            return formattedNumber;
        };
    })
// app.filter('to12HourTime',function(time) {
//   var b = time.split(/\D/);
//   return (b[0]%12 || 12) + ':' + b[1] +
//          (b[0]<11? ' AM' : ' PM');
// }

// // Some tests
// ['23:15','2:15','03:15','00:30'].forEach(function(v) {
//     console.log(v + ' => ' + to12HourTime(v));
// });return (hours + ":" + minutes + " " + suffix);
// });














 







