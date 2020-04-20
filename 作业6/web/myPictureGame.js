num=0;
isWin=true;
var t;
var date1;

window.onload=function(){
	create_picture();
	$("#restart").click(random_pos);
	$("#change_image").click(change_image);
}



/* 检查产生的随机数列是否是合理的，因为有可能出现恢复不到原图的情况 */
function isValid(random_arr) {
    var count = 0;
    for (var i = 0; i < 16; i++) {
        for (var j = i+1; j < 16; j++) {
            if (random_arr[j] < random_arr[i]) {
                count++;
            }
        }
    }
    return (count%2==0);
}



function change_image(){
	if(num==1)
		num=0;
	else
		num=1;

	for(var i=1;i<=16;++i){
		$("#_position_"+i).attr("class","picture_part" + num + " position_"+i);
	}
	$("#time").text("");
	$("#result").text("");
	$("#restart").text("开始");
	isWin=true;
	clearTimeout(t);
	$("#picture").children().unbind("click");
}

function create_picture(){
	for(var i=1;i<=16;++i){
		var part=document.createElement("div");
       		part.className = "picture_part" + num + " position_"+i;
       		part.id = "_position_"+i;
       		$("#picture").append(part);    		
	}
}

function random_pos(){
	$("#restart").text("重新开始");
	for(var i=1;i<=16;++i){
		$("#_position_"+i).attr("class","picture_part" + num + " position_"+i);
	}
	if(isWin){
		isWin=false;
		$("#picture").children().click(pic_move);
	}
	$("#result").text("");

	clearTimeout(t);
	date1 = new Date()
	startTime(date1);


	var random_arr=[];
	for (var i = 0; i < 15; i++) {
		random_arr[i]=i+1;
	}
	function rand(){
		return 0.5-Math.random();
	}
	while(true){
		random_arr.sort(rand);
		if(isValid(random_arr))
			break;
	}
	for(var i=0;i<15;++i)
		$("#picture").children()[i].className="picture_part" + num + " position_"+random_arr[i];
}

function pic_move(){
	var a=$("#_position_16").offset().top;
	var b=$("#_position_16").offset().left;
	var c=$(this).offset().top;
	var d=$(this).offset().left;
	if(Math.abs(a-c)==85&&b==d||Math.abs(b-d)==85&&a==c){
		var temp=$("#_position_16").attr("class");
		$("#_position_16").attr("class",this.className);
		this.className=temp;
		check();
	}
}

function check(){
	for(var i=1;i<16;++i){
		var temp=$("#_position_"+i).attr("class");
		if(temp!=("picture_part" + num + " position_"+i)){
			$("#result").text("Continue...");
			return;
		}
	}
	$("#result").text("You Win!");
	isWin=true;
	clearTimeout(t);
	$("#picture").children().unbind("click");
}

function startTime(date1)
{
	var date2 = new Date()
 
	var s1 = date1.getTime(),s2 = date2.getTime();
	var total = (s2 - s1)/1000;
 
 
	var day = parseInt(total / (24*60*60));//计算整数天数
	var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
	var hour = parseInt(afterDay/(60*60));//计算整数小时数
	var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
	var min = parseInt(afterHour/60);//计算整数分
	var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数
	$("#time").text("用时："+checkTime(hour)+":"+checkTime(min)+":"+checkTime(parseInt(afterMin)));
	t=setTimeout('startTime(date1)',500)
}

function checkTime(i){
	if (i<10&&i>=0) 
  		i="0" + i
  	return i
}