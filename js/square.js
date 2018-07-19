function Square(){
	this.data=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	this.origin={
		x:0,
		y:0
	},
	this.dir=0
}

Square.prototype.candown=function(isValid){
	var test={};
	test.x=this.origin.x+1;
	test.y=this.origin.y;
	return isValid(test,this.data);
}

Square.prototype.down=function(){
	this.origin.x+=1;
}

Square.prototype.canleft=function(isValid){
	var test={};
	test.x=this.origin.x;
	test.y=this.origin.y-1;
	return isValid(test,this.data);
}

Square.prototype.left=function(){
	this.origin.y-=1;
}

Square.prototype.canright=function(isValid){
	var test={};
	test.x=this.origin.x;
	test.y=this.origin.y+1;
	return isValid(test,this.data);
}

Square.prototype.right=function(){
	this.origin.y+=1;
}

// Square.prototype.canrotate=function(isValid){
// 	var test={};
// 	test.x=this.origin.x;
// 	test.y=this.origin.y+1;
// 	return isValid(test,this.data);
// }

// Square.prototype.rotate=function(){
// 	var a=[];
// 	var b=[
// 		[0,0,0,0],
// 		[0,0,0,0],
// 		[0,0,0,0],
// 		[0,0,0,0]
// 	];
// 	var length=this.data.length;
// 	for(var i=0;i<length;i++){
// 		a[i]=this.data[length-1-i];
// 	}
// 	for(var i=0;i<length;i++){
// 		for(var j=0;j<this.data[0].length;j++){
// 			b[i][j]=a[j][i];
// 		}
// 	}
// 	this.data=b;
// }
// 
Square.prototype.canrotate=function(isValid){
	var d=(this.dir+1)%4;
	var test=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	for(var i=0;i<this.data.length;i++){
		for(var j=0;j<this.data[0].length;j++){
			test[i][j]=this.rotates[d][i][j];
		}
	}
	return isValid(this.origin,test);
}

Square.prototype.rotate=function(num){
	if(!num)num=1;
	this.dir=(this.dir+num)%4;

	for(var i=0;i<this.data.length;i++){
		for(var j=0;j<this.data[0].length;j++){
			this.data[i][j]=this.rotates[this.dir][i][j];
		}
	}
}