function Local(socket){
	var timer=null;
	var timeCount=0;
	var time=0;
	//游戏对象
	var game;
	//绑定键盘事件
	 // 绑定键盘事件
  var bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode == 38) { // up
        game.rotate();
        socket.emit('rotate');
      } else if (e.keyCode == 39) { // right
        game.right();
        socket.emit('right');
      } else if (e.keyCode == 40) { // down
        game.down();
        socket.emit('down');
      } else if (e.keyCode == 37) { // left
        game.left();
        socket.emit('left');
      } else if (e.keyCode == 32) { // space
        game.fall();
        socket.emit('fall');
      }
    }
  }
	//移动
	
	var move=function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			socket.emit('fixed');
			var line=game.checkClear();
			if(line){
				game.addScore(line);
				socket.emit('line',line);
			}
			if(game.checkGameover()){
				game.gameover(false);
				$(".over").get(0).play();
				socket.emit('lose')
				pause();
			}else{
				var nextType = generateType();
		        var nextDir = generateDir();
		        game.createNext(nextType, nextDir);
		        socket.emit('next', {type: nextType, dir: nextDir});
			}
		}else { // 如果判断可以向下移动，则发送移动的消息
     	 socket.emit('down');
    	}
	}

	//计时函数
	var timeFunc=function(){
		timeCount++;
		if(timeCount==2){
			timeCount=0;
			time++;
			game.setTime(time);
			socket.emit('time',time);
		}
	}

	//随机生成方块种类
	var generateType=function(){
		return Math.floor(Math.random()*7+1);
	}
	//随机生成方块方向
	var generateDir=function(){
		return Math.floor(Math.random()*4)
	}
	//暂停
	var pause=function(){
		clearInterval(timer);
		timer=null;
		$(".background").get(0).pause();
	}
	var listen;
	//开始移动
	var startmove=function(){
		timer=setInterval(move,500)
		bindKeyEvent();
		$(".background").get(0).play();
	}

	//开始
	var start=function(){
		var doms={
			gameDiv:document.getElementById('local_game'),
			nextDiv:document.getElementById('local_next'),
			timeDiv:document.getElementById('local_time'),
			scoreDiv:document.getElementById('local_score'),
			resultDiv:document.getElementById('local_result')
		}
		game=new Game();
		var t1=game.generateType();
		var d1=game.generateDir();
		game.init(doms,t1,d1);
		socket.emit('init',{type:t1,dir:d1});
		var t2=game.generateType();
		var d2=game.generateDir();
		game.createNext(t2,d2);
		socket.emit('next',{type:t2,dir:t2});
		startmove();
	}

	var onlineStatus = true;

  socket.on('start', function() {

    var count=5;
    var timer=setInterval(function(){
    	if(count!=0){
	    	$('.waiting').text('匹配成功！'+count+'s后开始');
	    	count--;
    	}else{
    		start();
    		$('.waiting').text('');
    		clearInterval(timer);
    	}
    },1000)
    
    
  });

  // 对方输了
  socket.on('lose', function() {
    game.gameover(true);
    pause();
  });

  // 对方掉线
  socket.on('leave', function() {
    document.getElementById('local_result').innerHTML = '对方掉线';
    document.getElementById('remote_result').innerHTML = '已掉线';
    onlineStatus = false;
    pause();
  });


	//导出API
	this.start=start;
}