var socket=io('ws://localhost:3000');
var local=new Local(socket);
// local.start();
var remote=new Remote(socket);
socket.on('waiting',function(data){
	$('.waiting').text(data);
})