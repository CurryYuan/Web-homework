/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var _ = require('lodash');

var mongo = require('mongodb').MongoClient;

var mongourl = 'mongodb://localhost:27017/signin';

mongo.connect(mongourl).catch(function(error){
  console.log("Connect to mongodb " + mongourl + " was failed with error: ", error);
}).then(function(db){
  console.log("Connect to mongodb1 success");
  userManager=require('../public/js/user')(db);
})

var mongourl1='mongodb://localhost:27017/data'
mongo.connect(mongourl).catch(function(error){
  console.log("Connect to mongodb " + mongourl + " was failed with error: ", error);
}).then(function(db1){
  console.log("Connect to mongodb2 success");
    /*db1.collection('data').insertOne({ name: "菜鸟教程", url: "www.runoob" }, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
    });*/
    postManager=db1.collection('data');
    postManager.find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        data=result;
    });
})

/*
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "user":"aaaaaaa",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "reply":[{"username":"aaaaaaa","text":"very good","isHide":false}]
    },
    {
      "title": "Sed egestas",
      "user":"yuanzhihao",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.",
      "reply":[]
    }
  ]
};
*/
// GET

exports.posts = function (req, res) {
  var posts = [];
  data.forEach(function (post, i) {
    posts.push({
      id: i,
      user:post.user,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json({
      post: data[id]
    });
  } else {
    res.json(false);
  }
};

exports.search=function(req,res){
  postManager.find({$or:[{text:eval("/"+req.body[0]+"/i")},{title:eval("/"+req.body[0]+"/i")}]}).toArray(function(err,result){
    if(err)
      throw err;
    res.json({posts:result});
  })
}

exports.signin=function(req,res){
  if(req.session.user){
    res.json({status:true,user:req.session.user});
  }
  else{
    userManager.findUser(req.body.username, req.body.password)
        .then(function(user){
          req.session.user = user;
          res.json({status:true,user:user});
        })
        .catch(function(error){
          console.log(error)
          res.json({status:false,error:error})
        });
      }
};

exports.signup=function(req,res){
      var user = req.body;
      userManager.checkUser(user)
        .then(userManager.createUser)
        .then(function(){
          req.session.user = user;
          res.json({status:true});
        })
        .catch(function(error){
          res.json( { status:false, user: user, error: error});
        });
  }

  exports.logout=function(req,res){
    delete req.session.user;  
    res.json(true)
  }

// POST

exports.addPost = function (req, res) {
  data.push(req.body);
  postManager.insertOne(req.body,function(err){
    if(err) throw err;
  })
  res.json(req.body);
};

exports.replyPost=function(req,res){
  var id = req.body.id;
  if (id >= 0 && id < data.length) {
    var temp=JSON.parse(JSON.stringify(data[id]));
    data[id].reply.push({"username":req.body.name,"text":req.body.text});

    postManager.update(getQueryForUniqueInAttributes(temp),{$set:{"reply":data[id].reply}})

    res.json({post:data[id]});
  } else {
    res.json(false);
  }  
}

// PUT

exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    var temp=JSON.parse(JSON.stringify(data[id]));
    data[id] = req.body;
    postManager.update(getQueryForUniqueInAttributes(temp),{$set:{"title":data[id].title,"text":data[id].text}})
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    var temp=JSON.parse(JSON.stringify(data[id]));
    data.splice(id, 1);
    postManager.remove(getQueryForUniqueInAttributes(temp));
    res.json(true);
  } else {
    res.json(false);
  }
};

function getQueryForUniqueInAttributes(user) {
  return {
    $and: _(user).omit('_id').toPairs().map(pairToObject).value()
  };
}

function pairToObject(pair){
  obj = {}; 
  obj[pair[0]] = pair[1]; 
  return obj; 
}