// Game.js
var canvas = document.getElementById("myCanvas"); // Get canvas
var context = canvas.getContext("2d"); // Get print methods
window.addEventListener('keydown',check,false);
window.addEventListener("touchstart", handleStart, false);
canvas.style.backgroundColor = "#3a3a3a";

var defaults = {
	width: 750,
	height: 1335
}

var boardColors = { b: "black", o: "blue", s: "cyan", t: "lime", z: "orange", l: "pink", i: "red", j: "yellow" };

var squares = {};

var loadImages = function() {
	var colors = ["black", "blue", "cyan", "lime", "orange", "pink", "red", "yellow"];
	for (var i in colors){
		var newSquare = new Image();
		newSquare.name = colors[i];
		newSquare.onload = loadSquare;
		newSquare.src = "Graphics/" + colors[i] + ".png";
	}
};

var loadSquare = function() {
	squares[this.name] = this;
}

var t = new Tetris();

var Game = {
    element: document.getElementById("myCanvas"),
    width: defaults.width,
    height: defaults.height,
    softDropSpeed: null,
    softDropInterval: null,
    Init : function() {
    	Game.softDropSpeed = 500;
    	Game.softDropInterval = setInterval(Game.SoftDrop, Game.softDropSpeed);
    },

    Draw : function() {
		context.clearRect(0,0,canvas.width,canvas.height);
		Game.DrawBoard();
	},

	DrawBoard : function() {
		var x = 125;
		var y = 90;
		var size = 50;
		for (var i = 0; i < 10; i++) {
			for (var j = 2; j < 22; j++) {
				var color = t.board[j][i];
				Game.DrawSquare(x + i * size, y + j * size, boardColors[color]);
			}
		}
	},

	DrawSquare : function(x, y, color) {
		if (squares[color] != null)
			context.drawImage(squares[color], x, y);
	},

	SoftDrop : function() {
		t.step();
	}

  },
  
  resizeGame = function () {
  	var viewport = {
  		width: window.innerWidth,
  		height: window.innerHeight
  	}
  	var newGameWidth = defaults.width, newGameHeight = defaults.height;
  	
	// Determine Game size
	if (Game.height / Game.width > viewport.height / viewport.width) {
	  newGameHeight = viewport.height;
	  newGameWidth = newGameHeight * Game.width / Game.height;
	} else if (Game.width / Game.height > viewport.width / viewport.height) {
	  newGameWidth = viewport.width;
	  newGameHeight = newGameWidth * Game.height / Game.width;
	}

	// Resize Game
    Game.element.style.width = newGameWidth + "px";
    Game.element.style.height = newGameHeight + "px";

 	var newGameX = (viewport.width - newGameWidth) / 2;
	var newGameY = (viewport.height - newGameHeight) / 2;

	// Center the Game by setting the padding of the Game
	Game.element.style.padding = newGameY + "px " + newGameX + "px";

  };

Game.Init();

// ------ Drawing -------

function check(e) {
	console.log("Key pressed: " + e.keyCode);
	switch(e.keyCode) {
		case 40: t.step(); break;
		case 38: t.rotate(); break;
		case 37: t.left(); break;
		case 39: t.right(); break;
		case 32: t.lock(); t.step(); break;
	}
}

function handleStart(evt) {
	t.step();
}


window.addEventListener("resize", resizeGame);
resizeGame();

setInterval(Game.Draw,100);
loadImages();


