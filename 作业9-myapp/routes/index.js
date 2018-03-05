var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');

module.exports = function(db){

	var userManager=require('../models/user')(db);
	/* GET home page. */
	router.get('/signup', function(req, res, next) {
		res.render('signup.pug', { title: '注册' ,user:{}});
	});

	  router.post('/signin', function(req, res, next){
	    userManager.findUser(req.body.username, req.body.password)
	      .then(function(user){
	        req.session.user = user;
	        res.redirect('/detail');
	      })
	      .catch(function(error){
	        res.render('signin', { title: '登录' , error: '用户名密码错误'});
	      });
	  });

  	router.get('/signin', function(req, res, next) {
    		res.render('signin', { title: '登录'});
  	});

    router.post('/signup', function(req, res, next) {
      var user = req.body
      console.log(user)
      userManager.checkUser(user)
        .then(userManager.createUser)
        .then(function(){
          req.session.user = user;
          res.redirect('/detail');
        })
        .catch(function(error){
          res.render('signup', { title: '注册', user: user, error: error.message});
        });
    });

	  router.get('/signout', function(req, res, next) {
	    delete req.session.user
	    res.redirect('/signin');
	  });
	 router.all('*', function(req, res, next){
	    req.session.user ? next() : res.redirect('/signin');
	 });	

	router.get('/detail', function(req, res, next) {
	  res.render('detail.pug', { title: '详情',user:req.session.user });
	});

	return router;
}
