'use strict';

/* Controllers */

function IndexCtrl($rootScope,$scope, $http,$location) {
  $scope.check=false;

  $http.get('/api/posts').then(function(response){

    var data=response.data.posts;
    $scope.size=data.length;
    var pageSize=5;
    var pages=Math.ceil(data.length/pageSize);
    var newPages=pages>5?5:pages;
    $scope.pageList=[];
    var selPage=1;

    $scope.setData=function(){
      $scope.posts=data.slice(pageSize*(selPage-1),selPage*pageSize);
    }

    $scope.setData();
    for(var i=0;i<newPages;++i){
      $scope.pageList.push(i+1);
    }
    $scope.selectPage=function(page){
      if(page<1||page>pages)
        return;
      if(pages > 5){
        var newPageList=[];
        for(var i = (page-3<0) ? 0 : (page-3);i<((page+2)>pages? pages:(page+2));++i){
          newPageList.push(i+1);
        }
        $scope.pageList=newPageList;
      }
      selPage=page;
      $scope.setData();
    }

    $scope.isActivePage=function(page){
      return selPage==page
    }
    $scope.Previous=function(){
      $scope.selectPage(selPage-1);
    }
    $scope.Next=function(){
      $scope.selectPage(selPage+1);
    }
  })

    $rootScope.Search=function(){
      if($rootScope.searchContent){
        var temp=[];
        temp.push($rootScope.searchContent)
        $http.post('/api/search',temp).then(function(response){
          if(response.data.posts){
                var data=response.data.posts;
                $scope.size=data.length;
                var pageSize=5;
                var pages=Math.ceil(data.length/pageSize);
                var newPages=pages>5?5:pages;
                $scope.pageList=[];
                var selPage=1;            

                $scope.setData=function(){
                  $scope.posts=data.slice(pageSize*(selPage-1),selPage*pageSize);
                }           

                $scope.setData();
                for(var i=0;i<newPages;++i){
                  $scope.pageList.push(i+1);
                }
                $scope.selectPage=function(page){
                  if(page<1||page>pages)
                    return;
                  if(pages > 5){
                    var newPageList=[];
                    for(var i = (page-3<0) ? 0 : (page-3);i<((page+2)>pages? pages:(page+2));++i){
                      newPageList.push(i+1);
                    }
                    $scope.pageList=newPageList;
                  }
                  selPage=page;
                  $scope.setData();
                }           

                $scope.isActivePage=function(page){
                  return selPage==page
                }
                $scope.Previous=function(){
                  $scope.selectPage(selPage-1);
                }
                $scope.Next=function(){
                  $scope.selectPage(selPage+1);
                }
          }
        })
        $rootScope.searchContent="";
        
      }
    }

    $rootScope.logout=function(){
      $http.get('/api/logout').then(function(response){
        $rootScope.currentUser='';
        $location.path('/signin');
      })
    }
}

function SigninCtrl ($rootScope,$scope, $http, $location){
  $scope.user={};
  $http.post('/api/signin',$scope.user).then(function(response){
      if(response.data.status){
          $rootScope.currentUser=response.data.user;
          $location.path('/');
        }
    })
  
  $scope.error="";
  $scope.submitPost = function () {
   
    $http.post('/api/signin',$scope.user).then(function(response){
      if(response.data.status){
          $rootScope.currentUser=$scope.user
          $location.path('/');
        }
        else{
          $scope.error=response.data.error;
        }
    })
  }
  $scope.toSignup=function(){
    $location.path('/signup');
  }
}

function SignupCtrl($scope,$http,$location){
  $scope.user={username:"",password:"",email:""};
  $scope.error="";
  $scope.submitPost = function () {
      if (!validator.isFormValid()) {
        return false;
      };
    $http.post('/api/signup',$scope.user).then(function(response){
      if(response.data.status)
          $location.path('/signin');
        else{
                    console.log(response.data)

          $scope.user=response.data.user;
          $scope.error=response.data.error;
        }
    })
  }  
}

function AddPostCtrl($rootScope,$scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $scope.form.user=$rootScope.currentUser.username;
    $scope.form.reply=[];
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($rootScope,$scope,$location, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
    $scope.newReply="";

    $scope.submitReply=function(){
      var info={
        id:$routeParams.id,
        text:$scope.newReply,
        name:$rootScope.currentUser.username
      }
      $http.post('/api/replyPost',info).then(function(response){
        $scope.isClick=false;
        $scope.post=response.data.post;
      })
    }
    $scope.isEdit=false;

    $scope.editReply=function(){
      $scope.isEdit=false;
      console.log($scope.isEdit)
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
    }

    $scope.hideReply=function(){
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
    }
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
