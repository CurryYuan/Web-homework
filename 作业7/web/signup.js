var http = require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var querystring=require('querystring');
var url=require('url');

var i=0;
var data=new Array();
var reg1=/^[A-z]\w{5,17}$/
var reg2=/^[1-9][0-9]{7}$/
var reg3=/^[1-9][0-9]{10}$/
var reg4=/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/

var postHTML="<html><head><meta charset='utf-8'><link rel='stylesheet' type='text/css' href='info.css'><title>详情</title></head>"+
"<body><div><h1>用户详情</h1>";

var checkName=function(a){
	for(var k=0;k<data.length;++k){
		if(a==data[k].username)
			return true;
	}
	return false;
}
var checkId=function(a){
	for(var k=0;k<data.length;++k){
		if(a==data[k].id)
			return true;
	}
	return false;
}
var checkPhone=function(a){
	for(var k=0;k<data.length;++k){
		if(a==data[k].phone)
			return true;
	}
	return false;
}
var checkEmail=function(a){
	for(var k=0;k<data.length;++k){
		if(a==data[k].email)
			return true;
	}
	return false;
}

http.createServer(function (request, response) {
	var err=0;
    	var body="";
    	request.on('data', function (chunk) {
    		body += chunk;
  	});
    	request.on('end',function(){
    		if(body){
    			body=querystring.parse(body);
    			if(!reg1.test(body.username))
    				err=1;
    			else if(!reg2.test(body.id))
    				err=2;
    			else if(!reg3.test(body.phone))
    				err=3;
    			else if(!reg4.test(body.email))
    				err=4;
    			else if(checkName(body.username))
    				err=5;
    			else if(checkId(body.id))
    				err=6;
    			else if(checkPhone(body.phone))
    				err=7;
    			else if(checkEmail(body.email))
    				err=8;
    			else{
    				data[i]=body;
    				++i;
    				err=-1;
    			}
    			//fs.appendFileSync("data.json",JSON.stringify(body));
    		}
    		var params=url.parse(request.url,true).query;
    		//if(params){
    			for(var k=0;k<data.length;++k){
    				if(data[k].username==params.username){
    					err=-1;
    					body=data[k];
    					break;
    				}
    			}
    		//}
    		if(err==-1){
    			response.writeHead(200,{'Content-Type':'text/html'});
    			response.write(postHTML);
    			response.write("<p>用户名： "+body.username);
    			response.write("</p>");
    			response.write("<p>学号： "+body.id);
    			response.write("</p>");
    			response.write("<p>电话： "+body.phone);
    			response.write("</p>");
    			response.write("<p>邮箱：  "+body.email);
    			response.write("</p></div></body></html>");
    			response.end();
    			err=0;
    		}
    		else{
    			var filePath=url.parse(request.url,true).pathname;
    			if(filePath=='/')
				filePath='sign.html';
			else{
				filePath=filePath.substr(1,filePath.length);
			}
	
    			response.writeHead(200, {'Content-Type': mime.lookup(filePath)});
    			response.write(fs.readFileSync(filePath));
    			switch(err){
    			case 1:
    				response.end("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
    				break;
    			case 2:
    				response.end("学号8位数字，不能以0开头");
    				break;
    			case 3:
    				response.end("电话11位数字，不能以0开头");
    				break;
    			case 4:
    				response.end("邮箱格式为 大小写字母_-@大小写字母_- .2-4位大小写字母");
    				break;
    			case 5:
    				response.end("用户名已存在");
    				break;
    			case 6:
    				response.end("学号已存在");
    				break;
    			case 7:
    				response.end("电话已存在");
    				break;
    			case 8:
    				response.end("邮箱已存在");
    				break;
    			default:
    				response.end();
    				break;
    			}
   		}
    	})
    	

    	

    	//var result=JSON.parse(fs.readFileSync("data.json"));
    	

}).listen(8000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8000/');