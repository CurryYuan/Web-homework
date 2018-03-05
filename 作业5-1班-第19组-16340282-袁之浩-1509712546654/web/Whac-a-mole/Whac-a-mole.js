var button=document.getElementsByTagName("button")[0];
button.addEventListener("click",begin);

var start=false;
var isHit=false;
i=0;
var rand;
var t;
var score=1;

var hole=document.getElementsByClassName("ra");
/*for(var i in hole){
	(function(i){
		hole[i].onclick=function(){
		isHit=true;
		return hole[i].style.backgroundColor="green";
		};
	}(i));
}*/

function begin() {
	if(start){
		
		document.getElementById("output").value="Game Over";
		clearTimeout(t);		
		start=false;
		alert("Game Over!       Your score: "+score);
		location.reload();
	}
	else{
		document.getElementById("output").value="Game Start";
		i=0;
		score=1;
		document.getElementById("time").value=0;
		document.getElementById("score").value=0;
		random_();
		start=true;
	}
}

function random_(){
	if(i>30){
		document.getElementById("output").value="Game Over";
		alert("Game Over!       Your score: "+score);
		location.reload();
		return;
	}
	
	document.getElementById("time").value=i;
	++i;
	rand = parseInt(Math.random() * 60)
	hole[rand].style.backgroundImage="url(mouse.jpg)";
	hole[rand].addEventListener("click",click);

	if(isHit==false)
		score--;
	isHit=false;
	document.getElementById("score").value=score;
	setTimeout("hole[rand].removeEventListener('click',click)",1000);
	setTimeout("hole[rand].style.backgroundImage='url(hole.jpg)'",1000);
	t=setTimeout("random_()",1000);
}
function click(){
	hole[rand].style.backgroundImage="url(hit.jpg)";
	++score;
	document.getElementById("score").value=score;
	hole[rand].removeEventListener("click",click);
	isHit=true;
}

