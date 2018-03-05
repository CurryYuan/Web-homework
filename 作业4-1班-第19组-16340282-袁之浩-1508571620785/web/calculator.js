function Calculator(){
	this.show=document.getElementById("show");
	this.showres=document.getElementById("showres");
	this.expression="";
	this.clean=function(){
		this.show.value="";
		this.showres.value="0";
		this.expression="";
	}
	this.showExp=function(expression){
		this.expression+=expression;
		this.show.value=this.expression;
	}
	this.del=function(){
		this.expression=this.expression.substring(0,this.expression.length-1);
		this.show.value=this.expression;
		this.showres.value="0";
	}

	this.compare=function(a,b){
		if(a=="(")
			return true;
		if(b=="(")
			return true;
		if(a.match(/[\*\/]/)&&b.match(/[\+\-]/))
			return true;
		return false;
	}


	this.res=function(){

		var input=this.expression;
		if(input==""){
			this.showres.value="0";
			return;
		}
		if(!isNaN(input)){
			this.showres.value=input;
			return;
		}
		if(input.match(/^\(\d+\)$/)||input.match(/^\(\d+.\d+\)$/)){
			this.showres.value=input.substring(1,input.length-1);
			return;
		}

		input="("+input+")";

		input=input.replace(/\(\-/g,"(0-");

		var regex=/[\(\)\+\-\*\/)+]/;
		var array=input.split(regex);
		var RPolish="";
		var isI=false;
		var num=0;
		var SymbolArray=new Array();
		var SymbolNum=-1;
		for(var j=0;j<input.length;j++){
			if(input[j].match(/[\d.]/)){
				if(isI==false){
					RPolish+=",";
					while(array[num]=="")
						++num;
					RPolish+=array[num];
					++num;
					isI=true;
				}
			}
			else{
				isI=false;
				if(SymbolNum==-1){
					SymbolNum++;
					SymbolArray.push(input[j]);
				}
				else{
					if(input[j]==")"){
						while(SymbolNum>=0&&SymbolArray[SymbolNum]!="("){
							RPolish+=",";
							RPolish+=SymbolArray[SymbolNum];
							SymbolArray.pop();
							--SymbolNum;
						}
						SymbolArray.pop();
						--SymbolNum;
					}
					else if(this.compare(input[j],SymbolArray[SymbolNum])){
						SymbolNum++;
						SymbolArray.push(input[j]);
					}
					else{
						while(SymbolNum>=0&&!this.compare(input[j],SymbolArray[SymbolNum])){
							RPolish+=",";
							RPolish+=SymbolArray[SymbolNum];
							SymbolArray.pop();
							--SymbolNum;
						}
						SymbolNum++;
						SymbolArray.push(input[j]);
					}
				}
			}
		}
		while(SymbolNum>=0){
			RPolish+=",";
			RPolish+=SymbolArray[SymbolNum];
			SymbolArray.pop();
			--SymbolNum;
		}

		var RPolishArray=RPolish.split(",");
		var tempArray=new Array();
		var result=0;
		var tempNum=-1;
		for(var i=0;i<RPolishArray.length;++i){
			if(RPolishArray[i].match(/\d/)){
				tempArray.push(RPolishArray[i]);
				++tempNum;
			}
			else{
				switch(RPolishArray[i]){
					case '+':
						var r1,r2,m;
						try{r1=String(tempArray[tempNum-1]).split(".")[1].length}
						catch(e){r1=0}
						try{r2=String(tempArray[tempNum]).split(".")[1].length}
						catch(e){r2=0}
						m=Math.pow(10,Math.max(r1,r2));
						result=(tempArray[tempNum-1]*m+tempArray[tempNum]*m)/m;
						tempNum--;
						tempArray.pop();
						tempArray.pop();
						tempArray.push(result);
						break;
					case '-':
						var r1,r2,m;
						try{r1=String(tempArray[tempNum-1]).split(".")[1].length}
						catch(e){r1=0}
						try{r2=String(tempArray[tempNum]).split(".")[1].length}
						catch(e){r2=0}
						m=Math.pow(10,Math.max(r1,r2));
						result=(tempArray[tempNum-1]*m-tempArray[tempNum]*m)/m;
						tempNum--;
						tempArray.pop();
						tempArray.pop();
						tempArray.push(result);
						break;
					case '*':
						var r1,r2,m;
						try{r1=String(tempArray[tempNum-1]).split(".")[1].length}
						catch(e){r1=0}
						try{r2=String(tempArray[tempNum]).split(".")[1].length}
						catch(e){r2=0}
						m=r1+r2;
						r1=Math.pow(10,r1);
						r2=Math.pow(10,r2);
						result=(tempArray[tempNum-1]*r1*(tempArray[tempNum]*r2))/Math.pow(10,m);
						tempNum--;
						tempArray.pop();
						tempArray.pop();
						tempArray.push(result);
						break;
					case '/':
						var r1,r2,m;
						try{r1=String(tempArray[tempNum-1]).split(".")[1].length}
						catch(e){r1=0}
						try{r2=String(tempArray[tempNum]).split(".")[1].length}
						catch(e){r2=0}
						m=r1-r2;
						r1=Math.pow(10,r1);
						r2=Math.pow(10,r2);
						result=(tempArray[tempNum-1]*r1/(tempArray[tempNum]*r2))/Math.pow(10,m);
						tempNum--;
						tempArray.pop();
						tempArray.pop();
						tempArray.push(result);
						break;
					case '':
						break;
					default:
						this.showres.value="the expression is not valid";
						return;
						break;
				}
			}
		}
		result=tempArray[tempNum];
		if(typeof(result)!="number"||isNaN(result)){
			this.showres.value="the expression is not valid";
		}
		else
			this.showres.value=result;
	}
}


var calculator=new Calculator();

var CEButton=document.getElementsByClassName("CE");
CEButton[0].onclick=function(){
	calculator.clean();
}

var delButton=document.getElementsByClassName("del");
delButton[0].onclick=function(){
	calculator.del();
}

var resButton=document.getElementsByClassName("res");
resButton[0].onclick=function(){
	calculator.res();
}

var keyButton=document.getElementsByClassName("key");

for (var i in keyButton){
	(function(i){
            keyButton[i].onclick = function() {
            return calculator.showExp(keyButton[i].innerHTML);
            };
       }(i));
}