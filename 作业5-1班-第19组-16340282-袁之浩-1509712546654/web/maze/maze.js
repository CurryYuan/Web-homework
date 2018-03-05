var canvas=document.getElementsByTagName("canvas")[0];
var context=canvas.getContext("2d");

context.beginPath();
context.moveTo(1,1);
context.lineTo(600,0);
context.lineTo(600,200);
context.lineTo(450,200);
context.lineTo(450,80);
context.lineTo(200,80);
context.lineTo(200,200);
context.lineTo(1,200);
context.lineTo(1,1);
context.lineWidth=1;

context.moveTo(1,280);
context.lineTo(1,350);
context.lineTo(600,350);
context.lineTo(600,280);
context.lineTo(370,280);
context.lineTo(370,150);
context.lineTo(280,150);
context.lineTo(280,280);
context.lineTo(1,280);
context.lineWidth=1;
context.fillStyle="#EEEEEE";
context.fill();
context.stroke();

window.onload=function(){
	var div1=document.getElementById("d1");
	div1.addEventListener("mousemove",start);
	document.addEventListener("mousemove",judge);
	document.getElementById("d2").addEventListener("mousemove",end);
	s=0;
	e=0;
	function start(){
		s=1;
	}
	function end(){
		if(s==0){
			alert("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
			document.removeEventListener("mousemove",judge);
			location.reload();
		}
		e=1;
	}
	function judge(){
		if(s==1){
			x=event.clientX;
			y=event.clientY;
			if(x<462){
				alert("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
				document.removeEventListener("mousemove",judge);
				location.reload();
			}
			if(((x<659||x>908)&&y<380)||y<266||(x>741&&x<828&&y>335)||y>460){
				context.fillStyle="red";
				context.fill();
				context.stroke();
				setTimeout("alert('You Lose')",1);
				document.removeEventListener("mousemove",judge);
				setTimeout("location.reload()",1);
				//i=0;
			
			}
			else if(e==1){
				alert("You Win");
				document.removeEventListener("mousemove",judge);
				location.reload();
			}
		}
	}
	
}


/*window.onload = function () {
            var div1 = document.getElementsByTagName("div")[0];
            function getXY(eve) {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                return {x : scrollLeft + eve.clientX,y : scrollTop + eve.clientY };
            }
            document.getElementById("d1").onmousemove = function (ev) {
                var oEvent = ev || event;
                var pos = getXY(oEvent);
                div1.style.left = pos.x + "px";;
                div1.style.top = pos.y + "px";
            };
        };*/
        
