var reg1=/^[A-z]\w{5,17}$/
var reg2=/^[1-9][0-9]{7}$/
var reg3=/^[1-9][0-9]{10}$/
var reg4=/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/

$("#reset").click(function(event){
	$("input").attr("value","");
	$("#info").text("");
	return false;
});
$("#submit").click(function(event){
	if(!reg1.test($("#user").attr("value"))){
		$("#info").text("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
		return false;
	}
	if(!reg2.test($("#id").attr("value"))){
		$("#info").text("学号8位数字，不能以0开头");
		return false;
	}
	if(!reg3.test($("#phone").attr("value"))){
		$("#info").text("电话11位数字，不能以0开头");
		return false;
	}
	if(!reg4.test($("#email").attr("value"))){
		$("#info").text("邮箱的格式不对");
		return false;
	}
});

$("#user").bind("input",function(event){
	if(!reg1.test($("#user").attr("value"))){
		$("#info").text("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
		return false;
	}
	else{
		$("#info").text("");
	}
})
$("#id").bind("input",function(event){
	if(!reg2.test($("#id").attr("value"))){
		$("#info").text("学号8位数字，不能以0开头");
		return false;
	}
	else{
		$("#info").text("");
	}
})
$("#phone").bind("input",function(event){
	if(!reg3.test($("#phone").attr("value"))){
		$("#info").text("电话11位数字，不能以0开头");
		return false;
	}
	else{
		$("#info").text("");
	}
})
$("#email").bind("input",function(event){
	if(!reg4.test($("#email").attr("value"))){
		$("#info").text("邮箱格式为 大小写字母_-@大小写字母_- .2-4位大小写字母");
		return false;
	}
	else{
		$("#info").text("");
	}
})
document.onkeydown=function(e){
        var e = e || event;
        var currKey = e.keyCode || e.which || e.charCode;//支持IE,FireFox
        if (currKey == 13) {
            return false;
        }
    }