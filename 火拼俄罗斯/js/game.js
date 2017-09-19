var Game=function(){
	//dom元素
	var gameDiv;
	var nextDiv;
	//游戏矩阵
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
		[0,0,0,0,0,0,0,0,0,0]
	];
	//当前方块
	var cur;
	//下一个方块
	var next;

	//divs
	var nextDivs=[];
	var gameDivs=[];
	//初始化Div
	var initDiv=function(container,data,divs){
	for(var i=0;i<data.length;i++){
		var div=[];

		for(var j=0;j<data[0].length;j++){
			var newNode=document.createElement('div');
			newNode.className='none';
			newNode.style.top=(i*20)+'px';
			newNode.style.left=(j*20)+'px';
			container.appendChild(newNode);
			div.push(newNode);//把每一个div像素存到数组中
		}
		divs.push(div);//二维数组，在内层循环结束后追加，格式大概为[[i=0，j=1-10的一排],...[i=19的一排]]同gameData
		
		
	}
}
//刷新div
var refreshDiv=function(data,divs){
	for(var i=0; i<data.length;i++){//行数，列个数
		for(var j=0; j<data[0].length;j++){//列数，行个数
			if(data[i][j]==0){
				divs[i][j].className='none';
			}else if(data[i][j]==1){

				divs[i][j].className='done';
			}else if(data[i][j]==2){	
				divs[i][j].className='current';
			}
		}
	}
}
//初始化
var init=function(doms){
	gameDiv=doms.gameDiv;
	nextDiv=doms.nextDiv;
	cur = new Square();
	next = new Square();
	initDiv(gameDiv,gameData,gameDivs);
	initDiv(nextDiv,next.data,nextDivs);
	cur.origin.x=10;
	cur.origin.y=5;
	for(var i=0;i<cur.data.length;i++){
		for (var j=0;j<cur.data[0].length;j++){
			gameData[cur.origin.x+i][cur.origin.y+j]=cur.data;//gameData
			console.log(gameData);//cur.data有效
		}
	}
	refreshDiv(gameData,gameDivs);
	refreshDiv(next.data,nextDivs);

}
//导出API
this.init=init;
}

