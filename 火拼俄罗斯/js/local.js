var Local=function(){
	//游戏对象
	var game;
	//时间间隔
	var INTERVAL=300;
	//定时器
	var timer=null;
	//绑定键盘事件
	var bindKeyEvent=function(){
		document.onkeydown=function(event){//document.onkeydown固定格式小写
			var e=event||window.event||arguments.caller.arguments[0];
			if(e&&e.keyCode == 38){//up
				game.rotate();
			}else if(e&&e.keyCode == 39){//right
				game.right();
			}else if(e&&e.keyCode == 37){//left
				game.left();
			}else if(e&&e.keyCode == 32){//space
				game.fall();
			}else if(e&&e.keyCode){//down
				game.down();
				
			}
		}
	}
	//移动
	var move=function(){
		if(!game.down()){//是否到底部
			game.fixed();//变色
			game.checkClear();//消除
			var gameOver=game.checkGameOver();
			if(gameOver){
				stop();
			}else{
				game.performNext(generateType(),generateDir());//进行下一个随机方块和重置旋转
			}
		}
	}
	//随机生成一个方块
	var generateType=function(){
		return Math.ceil(Math.random()*7)-1;//返回0-6
	}
	//随机生成一个旋转次数
	var generateDir=function(){
		return Math.ceil(Math.random()*4)-1;//0-3
	}
	//开始
	var start =function(){
		var doms={
			gameDiv:document.getElementById('game'),
			nextDiv:document.getElementById('next')
		}
		game=new Game();
		game.init(doms);
		bindKeyEvent();
		timer=setInterval(move,INTERVAL);
	}
	//结束
	var stop=function(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}
		document.onkeydown=null;
		var r=confirm("游戏已结束，重新开始？");
			if (r==true)
			  {
			    location.reload();
			  }
			else
			  {
			    window.close();
			  }
	}
	//导出API
	this.start=start;
}