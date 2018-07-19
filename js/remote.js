var Remote=function(socket){
	var game;
	var dom;
	var bindEvents=function(){
	socket.on('init', function(data) {
      start(data.type, data.dir);
    });
    
    socket.on('next', function(data) {
      game.createNext(data.type, data.dir);
    });
    
    socket.on('rotate', function(data) {
      game.rotate();
    });
    
    socket.on('right', function(data) {
      game.right();
    });
    
    socket.on('down', function(data) {
      game.down();
    });
    
    socket.on('left', function(data) {
      game.left();
    });
    
    socket.on('fall', function(data) {
      game.fall();
    });
    
    socket.on('fixed', function(data) {
      game.fixed();
    });
    
    socket.on('line', function(data) {
      game.checkClear();
      game.addScore(data);
    });

    socket.on('time', function(data) {
      game.setTime(data);
    });



		// $('#down').on('click',function(){
		// 	game.down();
		// })
		// $('#left').on('click',function(){
		// 	game.left();
		// })
		// $('#right').on('click',function(){
		// 	game.right();
		// })
		// $('#rotate').on('click',function(){
		// 	game.rotate();
		// })
		// $('#fall').on('click',function(){
		// 	game.fall();
		// })
		// $('#fixed').on('click',function(){
		// 	game.fixed();
		// })
		// $('#create').on('click',function(){
		// 	game.createNext(game.generateType(),game.generateDir())
		// })
		// $('#check').on('click',function(){
		// 	game.checkClear();
		// })
		// $('#check').on('click',function(){
		// 	game.checkGameover();
		// })
		// $('#setTime').on('click',function(){
		// 	game.setTime();
		// })
		// $('#addScore').on('click',function(){
		// 	game.addScore();
		// })
		// $('#gameover').on('click',function(){
		// 	game.gameover();
		// })
		// $('#restart').on('click',function(){
		// 	game.restart(doms);
		// })
	}

	var start=function(type,dir){
		doms={
			gameDiv:document.getElementById('remote_game'),
			nextDiv:document.getElementById('remote_next'),
			timeDiv:document.getElementById('remote_time'),
			scoreDiv:document.getElementById('remote_score'),
			resultDiv:document.getElementById('remote_result')
		}
		game=new Game();
		game.init(doms,type,dir);
	}
	bindEvents();
}
