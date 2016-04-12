var app = angular.module('loginAu' , ['firebase']);

var ref = new Firebase("https://shining-inferno-3797.firebaseio.com/");

app.controller('veri', function($scope,$firebaseArray){
  $scope.authInfo = {
		email: undefined,
		password: undefined
	}
  
  $scope.signUp = function(){
    alert("gotcha!");
    ref.createUser({
  email    : $scope.authInfo.email,
  password : $scope.authInfo.password
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
})

    
  }
  




})