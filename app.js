var app = angular.module('loginAu', ['firebase']);




app.service('loginAuth', function($firebaseAuth, $firebaseObject) {
        var ref = new Firebase("https://shining-inferno-3797.firebaseio.com/");
        var loginAuth = this;

        var auth = $firebaseAuth(ref); //Provides angular methods for authenicating user


       

        loginAuth.signUp = function(email1, password1) {

            return auth.$createUser({
                email: email1,
                password: password1

            })
        }

        loginAuth.authUser = function(email1, password1) {

            return auth.$authWithPassword({
                email: email1,
                password: password1

            })
        }


        loginAuth.saveUserData = function(id) {
            var usersRef = ref.child("users");
            usersRef.child(id).set({ active_follers: true });
            console.log("saved: " + id + " to database");

        }

        loginAuth.getUserData = function(id) {

        var data  = $firebaseObject(ref.child('users').child(id));

        return data;

        }





        return loginAuth;
    })
    //model dom variables include authInfo.email ,authInfo.password , loginInfo.email,loginInfo.password


app.controller('veri', function($scope, loginAuth, $firebaseArray) {
    $scope.profile = null;
    $scope.authInfo = {
        email: undefined, //Dom is storing user in this property
        password: undefined
    }

    $scope.loginInfo = {
        email: undefined, //Dom is storing user in this property
        password: undefined
    }


    $scope.doSign = function() { //Creates a new user

        var result = loginAuth.signUp($scope.authInfo.email, $scope.authInfo.password);
        result.then(function(userData) {

            console.log("Success:" + userData.uid)

            var currentId = userData.uid;

            loginAuth.saveUserData(currentId);
        }, function(error) {

            console.log(error)
        })
    }



    $scope.login = function() { //Authenicates User 

        var result = loginAuth.authUser($scope.loginInfo.email, $scope.loginInfo.password);
        result.then(function(user) {

            console.log("logged in successfully!!!: " + user.uid)
                //$state.go(/profile);
            var currentId = user.uid;
         $scope.init(currentId);

        }, function(error) {

            console.log("Error logging in :" + error)
        })

    }

    $scope.init = function(currentId){
      //init calls getUserData that returns a promise with users data
       loginAuth.getUserData(currentId).$loaded().then(function(data) { 
      $scope.profile = data;
});
      
    }

})
