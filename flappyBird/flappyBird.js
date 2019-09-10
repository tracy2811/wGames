var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

document.addEventListener("keydown", moveUp, false);
document.addEventListener("click", moveUp, false);

var score = 0;
var gravity = 1.5;

// Bird position
var x = 50;
var y = 150;

// Pipe
var gap = 85; 	// gap between upper pipe and lower pipe
var pipe = [];
pipe[0] = {x: cvs.width, y: 0};

// Audio
var fly = new Audio();
var pass = new Audio();
var hit = new Audio();
 
fly.src = "sound/fly.mp3";
pass.src = "sound/pass.mp3";
hit.src = "sound/hit.wav";

// Images
var bg = new Image();
var fg = new Image();
var bird = new Image();
var upPipe = new Image();
var loPipe = new Image();

bg.src = "img/bg.png";
fg.src = "img/fg.png";
bird.src = "img/bird.png";
upPipe.src = "img/upPipe.png";
loPipe.src = "img/loPipe.png";

// Event Handlers
function moveUp() {
	y -= 25;
	fly.play();
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("Score: "+score, 30, cvs.height-20);
}

function drawBird() {
	ctx.drawImage(bird, x, y);
	y += gravity;
}

function drawPipe() {
	if (pipe[0].x < 0) {
		pipe.shift();
	}

	for (var i = 0; i < pipe.length; i++) {
		ctx.drawImage(upPipe, pipe[i].x, pipe[i].y);
		ctx.drawImage(loPipe, pipe[i].x, pipe[i].y+upPipe.height+gap);

		pipe[i].x--;

		if (pipe[i].x == 130) {
			pipe.push({
				x: cvs.width + Math.floor(Math.random()*50),
				y: Math.floor(Math.random()*upPipe.height)-upPipe.height
			});
		}
	}
}

function gameOver() {
	hit.play();
	alert("Game Over!");
	document.location.reload();
}

function collisionCheck() {
	// Hit the ground
	if (y+bird.height > cvs.height-fg.height) {
		gameOver();
	} else {

			// Hit pipe
		for (var i = 0; i < pipe.length; i++) {
			if (x+bird.width >= pipe[i].x && x <= pipe[i].x+upPipe.width && (y <= pipe[i].y+upPipe.height || y+bird.height > pipe[i].y+upPipe.height+gap)) {
				gameOver();
			}
		}
	}
}

function passCheck() {
	for (var i = 0; i < pipe.length; ++i) {
		if (pipe[i].x == 10) {
			score++;
			pass.play();
			break;
		}
	}
}

function draw() {
	ctx.drawImage(bg, 0, 0);
	drawBird();
	drawPipe();
	ctx.drawImage(fg, 0, cvs.height-fg.height);
	drawScore();

	collisionCheck();
	passCheck();

	requestAnimationFrame(draw);
}

draw();
