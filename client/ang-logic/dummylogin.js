app.controller("loginController", ['$location', function($location){
    $scope.LoginPage = function(){
        if($scope.usernameInput === 'Cortana' && $scope.passwordInput !==''){
            $location.path('/user/10');
        } else{
            alert('Username/Password incorrect; please verify your login and try again.');
            $scope.usernameInput.value('');
            $scope.passwordInput.value('');
        }
    }
}])