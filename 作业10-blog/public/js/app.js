'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl,
        allowAnonymous:false
      }).
      when('/signin',{
        templateUrl:'sign/signin',
        controller:SigninCtrl,
        allowAnonymous:true
      }).
      when('/signup',{
        templateUrl:'sign/signup',
        controller:SignupCtrl,
        allowAnonymous:true
      }).
      when('/detail', {
        templateUrl: 'sign/detail',
        allowAnonymous:false
      }).      
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl,
        allowAnonymous:false
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl,
        allowAnonymous:false
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl,
        allowAnonymous:false
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl,
        allowAnonymous:false
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }])
  .run(function($location, $rootScope){
    $rootScope.currentUser='';
    $rootScope.searchContent="";
    $rootScope.$on('$routeChangeStart',function(event,next){
      if(!next.allowAnonymous&&!$rootScope.currentUser){
        event.preventDefault();
        $location.path('/signin');
      }
    })
  })
