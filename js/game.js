function Game(){
	//dom 元素
	var gameDiv;
	var nextDiv;
	var timeDiv;
	var scoreDiv;
	var resultDiv;
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
	var randomIndex;
	var randomDir;
	var randomIndex2;
	var randomDir2;
	var squareFactory;
	var score=0;
	//当前方块
	var cur;
	//下一个方块
	var next;
	//divs
	var nextDivs=[];
	var gameDivs=[];

	//初始化div
	var initDiv=function(container,data,divs,width){
		for(var i=0; i<data.length;i++){
			var div=[];
			for(var j=0;j<data[0].length;j++){
				var newNode=document.createElement('div');
				newNode.className='none';
				newNode.style.width=(width/50)+'px';
				newNode.style.height=(width/50)+'px';
				newNode.style.top=(i*width/50)+'px';
				newNode.style.left=(j*width/50)+'px';
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}

	var refreshDiv=function(data,divs){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				if(data[i][j]==0){
					divs[i][j].className="none";
				}else if(data[i][j]==1){
					divs[i][j].className="current";
				}else if(data[i][j]==2){
					divs[i][j].className="done";
				}
			}
		}
	}

	//检测点是否合法
	
	var check=function(pos,x,y){
		if(pos.x+x<0){
			return false;
		}else if(pos.x+x>=gameData.length){
			return false;
		}else if(pos.y+y<0){
			return false;
		}else if(pos.y+y>=gameData[0].length){
			return false;
		}else if(gameData[pos.x+x][pos.y+y]==2){
			return false;
		}else{
			return true;
		}
	}

	//检测数据是否合法
	
	var isValid=function(pos,data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[0].length;j++){
				if(data[i][j]!=0){
					if(!check(pos,i,j)){
						return false;
					}
				}
			}
		}
		return true;
	}

	//设置数据
	var setData=function(){
		for(var i=0;i<cur.data.length;i++){
			for(var j=0;j<cur.data[0].length;j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];
				}
			}
		}
	}

	//清除数据
	var clearData=function(){
		for(var i=0;i<cur.data.length;i++){
			for(var j=0;j<cur.data[0].length;j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x+i][cur.origin.y+j]=0;
				}
			}
		}
	}


	//下移
	var down=function(){
		if(cur.candown(isValid)){
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
	var left=function(){
		if(cur.canleft(isValid)){
			clearData();
			cur.left();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//左移
	var right=function(){
		if(cur.canright(isValid)){
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//旋转
	var rotate=function(){
		if(cur.canrotate(isValid)){
			clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//方块移动到底部，固定
	var fixed=function(){
		for(var i=0;i<cur.data.length;i++){
			for(var j=0;j<cur.data[0].length;j++){
				if(check(cur.origin,i,j)){
					if(gameData[cur.origin.x+i][cur.origin.y+j]==1){
						gameData[cur.origin.x+i][cur.origin.y+j]=2;
					}
				}
			}
		}
		refreshDiv(gameData,gameDivs);
		$('.down').get(0).play();
	}

	//生成下一个方块
	var createNext=function(Type,Dir){
		cur=next;
		setData();
		next=SquareFactory.prototype.make(Type,Dir);
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}

	//随机生成方块种类
	var generateType=function(){
		return Math.floor(Math.random()*7+1);
	}
	//随机生成方块方向
	var generateDir=function(){
		return Math.floor(Math.random()*4)
	}

	//消行
	var checkClear=function(){
		var line=0;
		for(var i=gameData.length-1;i>=0;i--){
			var clear=true;
			for(var j=0;j<gameData[0].length;j++){
				if(gameData[i][j]!=2){
					clear=false;
					break;
				}
			}
			if(clear){
				line++;
				for(var m=i;m>0;m--){
					for(var n=0;n<gameData[0].length;n++){
						gameData[m][n]=gameData[m-1][n];
					}
				}
				for(var n=0;n<gameData[0].length;n++){
					gameData[0][n]=0;
				}
				i++;
			}
		}
		return line;
	}
	//检查游戏结束
	var checkGameover=function(){
		var gameover=false;
		for(var j=0;j<gameData[0].length;j++){
			if(gameData[0][j]==2){
				gameover=true;
			}
		}
		return gameover;
	}

	//设置时间
	var setTime=function(time){
		timeDiv.innerHTML=time;
	}

	//加分
	var addScore=function(line){
		var s=0;
		switch(line){
			case 1:
			s=10;
			break;
			case 2:
			s=30;
			break;
			case 3:
			s=60;
			break;
			case 4:
			s=100;
			break;
			default:
			s=150;
			break;
		}
		score+=s;
		scoreDiv.innerHTML=score;
		$('.score').get(0).play();
	}
	//游戏结束
	var gameover=function(win){
		if(win){
			$(".gameover h2.allscore").text(score);
			$(".gameover").show();
			$('#local_result').text("胜利 (^_^)∠※");
			$('#remote_result').text("失败 (^_^)∠※");
		}else{
			$(".gameover h2.allscore").text(score);
			$(".gameover").show();
			$('#local_result').text("失败 (^_^)∠※");
			$('#remote_result').text("胜利 (^_^)∠※");
		}
	}
	//重新游戏
	var restart=function(doms){
			gameData=[
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
		init(doms);
	}
	
	//根据屏幕大小更新位置
	var refreshplace=function(height){
		$('.result').css('top',height/4)
		$('.info').css('top',height/5);
		$('.row>.col-xs-3 button').css('top',height*7/18);
		$('.explain').css('top',height/2)
	}

	//初始化
	var init=function(doms,type,dir){
		var width=$(document).width();
		var height=$(document).height();
		refreshplace(height);
		gameDiv=doms.gameDiv;
		nextDiv=doms.nextDiv;
		timeDiv=doms.timeDiv;
		scoreDiv=doms.scoreDiv;
		resultDiv=doms.resultDiv;
		squareFactory=new SquareFactory();
		next=squareFactory.make(type,dir);
		initDiv(gameDiv,gameData,gameDivs,width);
		initDiv(nextDiv,next.data,nextDivs,width);
		refreshDiv(next.data,nextDivs);
	}
	//导出API
	
	this.init=init;
	this.down=down;
	this.left=left;
	this.right=right;
	this.rotate=rotate;
	this.fall=function(){
		while(down());
	}
	this.fixed=fixed;
	this.createNext=createNext;
	this.checkClear=checkClear;
	this.checkGameover=checkGameover;
	this.setTime=setTime;
	this.addScore=addScore;
	this.gameover=gameover;
	this.restart=restart;
	this.generateType=generateType;
	this.generateDir=generateDir;
}