$http.get('http://localhost:3000/api/favs/user')
    .then(function(response){
        console.log(response);
        response.data.forEach(function(element){
            if(element.id === id){
               $scope.User = element.username 
            } else{
                alert('User not found.');
            }
        })
    })

$scope.saveFavorite = function(){
    var data = ({
            id : $scope.userID,
            name : $scope.name,
            placeID : $scope.id,
            image_url : $scope.image_url,
            display_address : $scope.display_address,
            displayphone: $scope.displayphone
    });
    $http.post('http://localhost:3000/api/favs', data)
    .then(function(response){
        console.log(response);
        alert('Favorite Saved!');
    });
};