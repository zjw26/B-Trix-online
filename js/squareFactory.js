function Square1(){
	Square.call(this);
	this.rotates=[
		[
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0]
		],
		[
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0]
		],
		[
			[0,0,0,0],
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0]
		]
	]
}

Square1.prototype=Square.prototype;

function Square2(){
	Square.call(this);
	this.rotates=[
		[
			[0,1,0,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,1,0,0],
			[1,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,1,0],
			[0,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		]
	]
}

Square2.prototype=Square.prototype;


function Square3(){
	Square.call(this);
	this.rotates=[
		[
			[1,1,1,0],
			[0,0,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[0,1,0,0],
			[1,1,0,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[1,0,0,0],
			[1,0,0,0],
			[0,0,0,0]
		]
	]
}

Square3.prototype=Square.prototype;

function Square4(){
	Square.call(this);
	this.rotates=[
		[
			[1,1,1,0],
			[1,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,0,1,0],
			[1,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,0,0,0],
			[1,1,0,0],
			[0,0,0,0]
		]
	]
}

Square4.prototype=Square.prototype;

function Square5(){
	Square.call(this);
	this.rotates=[
		[
			[1,1,0,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		]
	]
}

Square5.prototype=Square.prototype;

function Square6(){
	Square.call(this);
	this.rotates=[
		[
			[0,1,1,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		],
		[
			[0,1,1,0],
			[1,1,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[1,0,0,0],
			[1,1,0,0],
			[0,1,0,0],
			[0,0,0,0]
		]
	]
}
Square6.prototype=Square.prototype;

function Square7(){
	Square.call(this);
	this.rotates=[
		[
			[1,1,0,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,0,0],
			[1,0,0,0],
			[0,0,0,0]
		],
		[
			[1,1,0,0],
			[0,1,1,0],
			[0,0,0,0],
			[0,0,0,0]
		],
		[
			[0,1,0,0],
			[1,1,0,0],
			[1,0,0,0],
			[0,0,0,0]
		],
	]
}
Square7.prototype=Square.prototype;

// function Square8(){
// 	Square.call(this);
// 	this.rotates=[
// 		[
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0]
// 		],[
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0]
// 		],[
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0]
// 		],[
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0],
// 			[0,0,0,0]
// 		]
// 	]
// }
// Square8.prototype=Square.prototype;

function SquareFactory(){}
SquareFactory.prototype.make=function(index,dir){
	var s;
	switch(index){
		case 1:
		s=new Square1;
		break;
		case 2:
		s=new Square2;
		break;
		case 3:
		s=new Square3;
		break;
		case 4:
		s=new Square4;
		break;
		case 5:
		s=new Square5;
		break;
		case 6:
		s=new Square6;
		break;
		case 7:
		s=new Square7;
		break;
		// case 8:
		// s=new Square8;
		// break;
		default:
		break;
	}
	s.origin.x=0;
	s.origin.y=3;
	s.rotate(dir);
	return s;
}