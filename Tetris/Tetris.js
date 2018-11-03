var Tetris = function() {
	var board =[['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
				['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']];

	var colors = { b: "black", o: "blue", s: "cyan", t: "lime", z: "orange", l: "pink", i: "red", j: "yellow" };

	function Block(type) {
		this.x = type == "o" ? 4 : 3; // Center them
		this.y = 0;
		this.rotation = 0;
		this.type = type;
		this.blocks = [[0,0],[0,0],[0,0],[0,0]];
		this.setPosition = function(newx, newy, r) {
			console.log(newx + " " + newy + " " + r);
			var orientation = getOrentation(this.type, r);
			for (var block in orientation) {
				this.blocks[block][0] = orientation[block][0] + newx;
				this.blocks[block][1] = orientation[block][1] + newy;
			}
			this.x = newx;
			this.y = newy;
			this.rotation = r;
		}
	}


	function getOrentation(block, i) {
		var orientations = {
			i : [[[0,1],[1,1],[2,1],[3,1]],
				 [[2,0],[2,1],[2,2],[2,3]],
				 [[0,2],[1,2],[2,2],[3,2]],
				 [[1,0],[1,1],[1,2],[1,3]]],

			j : [[[0,0],[0,1],[1,1],[2,1]],
				 [[1,0],[2,0],[1,1],[1,2]],
				 [[0,1],[1,1],[2,1],[2,2]],
				 [[1,0],[1,1],[0,2],[1,2]]],

			l : [[[2,0],[0,1],[1,1],[2,1]],
				 [[1,0],[1,1],[1,2],[2,2]],
				 [[0,1],[1,1],[2,1],[0,2]],
				 [[0,0],[1,0],[1,1],[1,2]]],

			o : [[[0,0],[1,0],[0,1],[1,1]],
				 [[0,0],[1,0],[0,1],[1,1]],
				 [[0,0],[1,0],[0,1],[1,1]],
				 [[0,0],[1,0],[0,1],[1,1]]],

			s : [[[1,0],[1,1],[2,0],[0,1]],
				 [[1,0],[1,1],[2,1],[2,2]],
				 [[1,1],[2,1],[0,2],[1,2]],
				 [[0,0],[0,1],[1,1],[1,2]]],

			t : [[[1,0],[0,1],[1,1],[2,1]],
				 [[1,0],[1,1],[1,2],[2,1]],
				 [[0,1],[1,1],[2,1],[1,2]],
				 [[1,0],[0,1],[1,1],[1,2]]],

			z : [[[1,0],[0,0],[1,1],[2,1]],
				 [[2,0],[1,1],[1,2],[2,1]],
				 [[0,1],[1,1],[2,2],[1,2]],
				 [[1,0],[0,1],[1,1],[0,2]]],
		}

		return orientations[block][i % 4];
	}

	var current;
	var hitBottom;

	function newRandomPiece() {
		var pieces = ['i', 'o', 't', 'j', 'l', 's', 'z'];
		var random = pieces[Math.floor(Math.random()*pieces.length)];
		return new Block(random);

	}

	function fall() {
		moveCurrent("down");
	}

	function moveCurrent(type) {
		for (var block in current.blocks) {
			var x = current.blocks[block][0];
			var y = current.blocks[block][1];
			board[y][x] = 'b';
		}
		var x = current.x;
		var y = current.y;
		var r = current.rotation;

		switch (type) {
			case "up":
				current.setPosition(x, y-1, r);
				break;
			case "down": 
				current.setPosition(x, y+1, r);
				break;
			case "left": 
				current.setPosition(x-1, y, r);				
				break;
			case "right": 
				current.setPosition(x+1, y, r);			
				break;
			case "rotate": 
				current.setPosition(x, y, (r + 1) % 4);			
				break;
		}

		if (!isValid(current.blocks)) {
			current.setPosition(x, y, r);
		}

		for (var block in current.blocks) {
			var x = current.blocks[block][0];
			var y = current.blocks[block][1];
			board[y][x] = current.type;
		}
	}

	function isValid(blocks) {
		for (var block in current.blocks) {
			var x = current.blocks[block][0];
			var y = current.blocks[block][1];
			if (x < 0 || x >= 10 || y >= 22 || board[y][x] != 'b') return false;
		}
		return true;
	}

	return {
		board : board,
		step: function() {
			if (current == null) { current = newRandomPiece();	hitBottom = false;}
			fall();
		},
		rotate: function() {
			moveCurrent("rotate");
		},
		left: function() {
			moveCurrent("left");
		},
		right: function() {
			moveCurrent("right");
		},
		lock: function() {
			current = null;
		}	
	};
}