var app = angular.module('app.controllers', []);
//get list of bars controller
app.controller("BarGet",['$scope', '$http','$location',function($scope,$http,$location,$httpProvider){

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