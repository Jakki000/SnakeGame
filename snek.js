let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let snake = new makeObject(40,40,10,10,'green');
let apple = new makeObject(60,60,10,10,'red');
let scoreText = document.getElementById("score");
let colliding = false;
let tail = [];
let lastPos = {
	x: snake.x,
	y: snake.y
}

tail.unshift(lastPos);

function makeObject(x,y,width,height,color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.dx = 0;
	this.dy = 0;
	this.draw = () => {
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.strokeRect(this.x,this.y,this.width,this.height);
	}
	this.nextPos = function() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

document.addEventListener("keydown", function(e) {
	switch(e.keyCode) {
		case 37:
			snake.dx = -10;
			snake.dy = 0;
			break;
		case 38:
			snake.dx = 0;
			snake.dy = -10;
			break;
		case 39:
			snake.dx = 10;
			snake.dy = 0;
			break;
		case 40:
			snake.dx = 0;
			snake.dy = 10;
			break;
	}
});

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min) * 10;
}

function eat() {
	if(snake.x == apple.x && snake.y == apple.y) {
		colliding = true;
		let newX, newY;
		while(colliding) {
			colliding = false;
			
			newX = getRandomInt(1,18);
			newY = getRandomInt(1,18);

			for(let part of tail) {
				if(newX == part.x && newY == part.y) {
					colliding = true;
					break;
				}
			}
		}
		apple.x = newX
		apple.y = newY;
		
		lastPos = {
			x: snake.x,
			y: snake.y
		}
	}
	else {
		lastPos = tail.pop();
		lastPos.x = snake.x;
		lastPos.y = snake.y;
	}
	tail.unshift(lastPos);
	for (let i = 0; i < tail.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(tail[i].x, tail[i].y, 10, 10);
		ctx.strokeRect(tail[i].x, tail[i].y, 10, 10);
	}
}

function death() {
	for (let i = 0; i < tail.length; i++) {
		if (snake.x == tail[i].x && snake.y == tail[i].y) {
			tail = [];
			lastPos = {
				x: snake.x,
				y: snake.y
			}
			tail.unshift(lastPos);
		}
	}
}

function edge() {
	if (snake.x < 0) {
		snake.x = 190;
	}
	if (snake.x > 190) {
		snake.x = 0;
	}
	if (snake.y < 0) {
		snake.y = 190;
	}
	if (snake.y > 190) {
		snake.y = 0;
	}
}

function loop() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	eat();
	//snake.draw();
	snake.nextPos();
	edge();
	death();
	apple.draw();
	scoreText.innerHTML = "LENGTH: " + tail.length;
}

setInterval(loop,180);