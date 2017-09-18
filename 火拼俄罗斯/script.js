//下一个图形
var nextData=[
	[2,2,0,0],
	[0,2,2,0],
	[0,0,0,0],
	[0,0,0,0]
];
//游戏界面
var gameData=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,0]
];
var nextDivs=[];
var gameDivs=[];

//给各模块增加子节点，小方块
var initGame=function(){
	for(var i=0;i<gameData.length;i++){
		var gameDiv=[];

		for(var j=0;j<gameData[0].length;j++){
			var newNode=document.createElement('div');
			newNode.className='none';
			newNode.style.top=(i*20)+'px';
			newNode.style.left=(j*20)+'px';
			document.getElementById('game').appendChild(newNode);
			gameDiv.push(newNode);//把每一个div像素存到数组中
		}
		gameDivs.push(gameDiv);//二维数组，在内层循环结束后追加，格式大概为[[i=0，j=1-10的一排],...[i=19的一排]]同gameData
		
		
	}
}
var initNext=function(){
	for(var i=0;i<nextData.length;i++){
		var nextDiv=[];
		for(var j=0;j<nextData[0].length;j++){
			var newNode=document.createElement('div');
			newNode.className='none';
			newNode.style.top=(i*20)+'px';
			newNode.style.left=(j*20)+'px';
			document.getElementById('next').appendChild(newNode);
			nextDiv.push(newNode);
		}
		nextDivs.push(nextDiv);
	}
}
console.log(nextDivs);
var refreshGame=function(){
	for(var i=0; i<gameData.length;i++){//行数，列个数
		for(var j=0; j<gameData[0].length;j++){//列数，行个数
			if(gameData[i][j]==0){
				gameDivs[i][j].className='none';
			}else if(gameData[i][j]==1){

				gameDivs[i][j].className='done';
			}else if(gameData[i][j]==2){	
				gameDivs[i][j].className='current';
			}
		}
	}
}

var refreshNext=function(){
	for(var i=0; i<nextData.length;i++){
		for(var j=0; j<nextData[0].length;j++){
			if(nextData[i][j]==0){
				
				nextDivs[i][j].className='none';
			}else if(nextData[i][j]==1){
				/*位置能取到 console.log(i,j);//2*/
				nextDivs[i][j].className='done';
			}else if(nextData[i][j]==2){
				nextDivs[i][j].className='current'; 
			}
		}
	}
}


initNext();
initGame();
refreshGame();
refreshNext();