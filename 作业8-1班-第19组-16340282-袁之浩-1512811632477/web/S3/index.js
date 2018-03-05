var s={}
var isClick=false;
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
	$(this).text(sum);
}

$("#button").mouseleave(function(){
	setTimeout("location.replace(location.href);",500);
})

var num=0;
$(".apb").click(function(){
	$("span").show();
	$("span").text("...");
	$(".button").unbind("click");
	$.ajaxSetup({ cache: false });
	for(var i=0;i<5;++i){
		(function(arg){
		$.get("numbers",function(data,status){
			$(".button").eq(arg).children().text(data);
			$(".button").eq(arg).addClass("gray");
			++num;
			if(num==5){
				var sum=0;
				for(var i=0;i<5;++i){
					sum+=parseInt($("span").eq(i).text());
				}
				$("#info-bar").text(sum);
			}
		})
	})(i)
	}
	
})