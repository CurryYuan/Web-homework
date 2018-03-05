var _ = require('lodash');
var bcrypt = require('bcrypt-as-promised');
var validator = require('./validator');
var debug = require('debug')('blog:user');

module.exports = function(db){
  var users = db.collection('signin');
  return {
    findUser: function(username, password){
      return users.findOne({username: username}).then(function(user){
        return user ? bcrypt.compare(password, user.password).then(function(){
          return user;
        }) : Promise.reject("user doesn't exist");
      });
    },

    createUser: function(user){
      var iteration = 10;
      return bcrypt.hash(user.password, iteration).then(function(hash){
        user.password = hash;
        return users.insert(user);
      });
    },


  checkUser: function(user){
    var formatErrors = validator.findFormatErrors(user);
    return new Promise(function(resolve, reject){
      formatErrors ? reject(formatErrors) : resolve(user);
    }).then(function(){
        return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser){
          console.log("existed user: ", existedUser);
          return existedUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
        })
      });
    }
  }
}

function getQueryForUniqueInAttributes(user) {
  return {
    $or: _(user).omit('password').toPairs().map(pairToObject).value()
  };
}

function pairToObject(pair){
  obj = {}; 
  obj[pair[0]] = pair[1]; 
  return obj; 
}
