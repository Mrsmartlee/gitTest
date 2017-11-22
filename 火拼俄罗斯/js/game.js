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
	//初始化Div,最后加到divs中，divs对应下面的gameDivs
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
//检测点是否合法,解决超出边界报错
var check=function(pos,x,y){//原点pos,位置x,y
	if(pos.x+x<0){//超出上下
		return false;
	}else if(pos.x+x>=gameData.length){
		return false;
	}else if(pos.y+y<0){//超出两侧
		return false;
	}else if(pos.y+y>=gameData[0].length){
		return false;
	}else if(gameData[pos.x+x][pos.y+y]==1){//底部已经有方块
		return false;
	}else{
		return true;
	}
}
//检测数据是否合法，解决超出边界仍旧可以移动
var isValid=function(pos,data){
	for(var i=0;i<data.length;i++){
		for(var j=0;j<data[0].length;j++){
			if(data[i][j] !=0){
				if(!check(pos,i,j)){
					return false;
				}
			}
		}
	}
	return true;
}

//清楚数据
var clearData=function(){
	for(var i=0;i<cur.data.length;i++){//列个数
		for (var j=0;j<cur.data[0].length;j++){//行个数
			if(check(cur.origin,i,j)){
				gameData[cur.origin.x+i][cur.origin.y+j]=0;//更新到gameData中
			}
		}	
	}
}
//设置数据
 var setData=function(){
 	for(var i=0;i<cur.data.length;i++){//列个数
		for (var j=0;j<cur.data[0].length;j++){//行个数
			if(check(cur.origin,i,j)){
				gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];//更新到gameData中
			}
		}
	}
 }
 //下移
 var down = function(){
 	//操作前先判断是否可以下降,isValid检测数据是否合法
 	if (cur.canDown(isValid)){
 		clearData();
 		cur.down();
	 	setData(); 
	 	refreshDiv(gameData,gameDivs);
	 	return true;
 	}else{
 		return false;
 	}
 }
  //左移
 var left = function(){
 	//操作前先判断是否可以左移,isValid检测数据是否合法
 	if (cur.canLeft(isValid)){
 		clearData();
 		cur.left();
	 	setData();
	 	refreshDiv(gameData,gameDivs);
 	}
 }
  //右移
 var right = function(){
 	//操作前先判断是否可以右移,isValid检测数据是否合法
 	if (cur.canRight(isValid)){
 		clearData();
 		cur.right();
	 	setData();
	 	refreshDiv(gameData,gameDivs);
 	}
 }
//旋转
 var rotate = function(){
 	//操作前先判断是否可以旋转,isValid检测数据是否合法
 	if (cur.canRotate(isValid)){
 		clearData();
 		cur.rotate();
	 	setData();
	 	refreshDiv(gameData,gameDivs);
 	}
 }
//底部固定
var fixed=function(){
	for(var i=0;i<cur.data.length;i++){
		for (var j = 0; j < cur.data[0].length; j++) {
			if(check(cur.origin,i,j)){
				if(gameData[cur.origin.x+i][cur.origin.y+j] == 2){
					gameData[cur.origin.x+i][cur.origin.y+j]=1;
				}
			}
		}
	}	
	refreshDiv(gameData,gameDivs);	
}
//消除满格方块
var checkClear=function(){
	for(var i=gameData.length-1;i>=0;i--){
		var clear =true;
		for(var j=0;j<gameData[0].length;j++){
			if(gameData[i][j]!=1){
				clear=false;
				break;
			}
		}
		if(clear){
			for(var m=i;m>0;m--){
				for (var n = 0; n < gameData[0].length; n++) {
					gameData[m][n]=gameData[m-1][n];
				}
			}
			for(var n = 0; n < gameData[0].length; n++){
				gameData[0][n]=0;
			}
			i++;
		}
	}
}
//检查游戏结束
var checkGameOver=function(){
	var gameOver =false;
	for (var i = 0; i < gameData[0].length; i++) {
		if(gameData[1][i]==1){
			gameOver=true;
		}	
	}
	return gameOver;
}
//使用下一个方块
var performNext=function(type,dir){
	cur=next;
	setData();
	next=SquareFactory.prototype.make(type,dir);
	refreshDiv(gameData,gameDivs);
	refreshDiv(next.data,nextDivs);
}
//初始化
var init=function(doms){
	gameDiv=doms.gameDiv;
	nextDiv=doms.nextDiv;
	//game框
	cur = SquareFactory.prototype.make(2, 2);
	//next框
	next = SquareFactory.prototype.make(3, 3);//从square.js中实例化出来
	initDiv(gameDiv,gameData,gameDivs);
	//next.data就是square.js中的实例化出来的data，并放入nextDiv（class为next的div）中，并把结果存入nextDivs数组中
	initDiv(nextDiv,next.data,nextDivs);

	setData();
	//console.log(gameData);
	refreshDiv(gameData,gameDivs);
	//console.log(gameDivs);//并没有变2对应的class
	refreshDiv(next.data,nextDivs);

}
//导出API
this.init=init;
this.down=down;
this.left=left;
this.right=right;
this.rotate=rotate;
this.fall=function(){while(down());}
this.fixed=fixed;
this.performNext=performNext;
this.checkClear=checkClear;
this.checkGameOver=checkGameOver;
}

