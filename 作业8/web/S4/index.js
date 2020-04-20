var s={}
var isClick=false;
var num=0;
s["a"]=s["b"]=s["c"]=s["d"]=s["e"]=-2;
$(".button").children().hide();
$(".button").click(clk);
$("#info-bar").click(cal);

function clk(){
	var g=$(this).children().attr("id");
	if(s[g]!=-2)
		return;
	s[g]=-1;
	f1();
	$(this).children().show();
	$(this).children().text("...");
	$(".button").unbind("click");

	$.get("numbers",function(data,status){
		$(this).children().text(data);
		f2();
		$(this).addClass("gray");
		$(".button").click(clk);
		$(this).unbind("click");
		s[$(this).children().attr("id")]=data;
		++num;
		if(num<5){
			$(".button").eq(ss[num]).click();
		}
		if(num==5){
			$("#info-bar").click();
		}
	}.bind(this))
}

function f1(){
	for(var i=0;i<5;++i){
		if(s[$("span").eq(i).attr("id")]==-2){
			$(".button").eq(i).addClass("gray");	
		}
	}
}
function f2(){
	for(var i=0;i<5;++i){
		if(s[$("span").eq(i).attr("id")]==-2){
			$(".button").eq(i).removeClass("gray");	
		}
	}
}
function cal(){
	var sum=0;
	for(var i=0;i<5;++i){
		if(s[$("span").eq(i).attr("id")]<0)
			return;
	}
	for(var i=0;i<5;++i){
		sum+=parseInt($("span").eq(i).text());
	}
	console.log(sum);
	$(this).text(sum);
}

$("#button").mouseleave(function(){
	setTimeout("location.replace(location.href);",500);
})

var ss=new Array();
var gg=new Array("A","B","C","D","E");
$(".apb").click(function(){
	for(var i=0;i<5;++i){
		var t=Math.floor(Math.random()*5);
		while(!check(t)){
			t=Math.floor(Math.random()*5);
		}
		ss[i]=t;
		$("#order").text($("#order").text()+gg[ss[i]]);		
	}

	$(".button").eq(ss[num]).click();
})

function check(n){
	for(var j=0;j<ss.length;++j){
		if(ss[j]==n)
			return false;
	}
	return true;
}