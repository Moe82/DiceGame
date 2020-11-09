// Die variables
let die;
let dieFaces;
let dieRollingFaces;

let bgImage;

// Game Conroller Variables
let gameController;
let startGame = false; // True when game starts. Game starts after user inputs the number of players.
let players = []; // An array of Player objects.
let currPlayer;
let winner = false; // true when a winner is found 

//Button Variables
let rollBetBTN;
let rollNoBetBTN;
let holdBTN;
let playAgainBTN;
let betEvenBTN;
let betOddBTN;

//Load images before the game starts
function preload() {
	bgImage = loadImage("./Assets/CaisonBG.jpg");
	dieFaces = [loadImage("./Assets/alea-face-1.png"), loadImage("./Assets/alea-face-2.png"), loadImage("./Assets/alea-face-3.png"), loadImage("./Assets/alea-face-4.png"), loadImage("./Assets/alea-face-5.png"), loadImage("./Assets/alea-face-6.png")];
	dieRollingFaces = [
		loadImage("./Assets/rolling-alea (1).png"), loadImage("./Assets/rolling-alea (2).png"), loadImage("./Assets/rolling-alea (3).png"), loadImage("./Assets/rolling-alea (4).png"),
		loadImage("./Assets/rolling-alea (5).png"), loadImage("./Assets/rolling-alea (6).png"), loadImage("./Assets/rolling-alea (7).png"), loadImage("./Assets/rolling-alea (8).png"),
		loadImage("./Assets/rolling-alea (9).png"), loadImage("./Assets/rolling-alea (10).png"), loadImage("./Assets/rolling-alea (11).png"), loadImage("./Assets/rolling-alea (12).png"),
		loadImage("./Assets/rolling-alea (13).png"), loadImage("./Assets/rolling-alea (14).png"), loadImage("./Assets/rolling-alea (15).png"), loadImage("./Assets/rolling-alea (16).png"),
		loadImage("./Assets/rolling-alea (17).png"), loadImage("./Assets/rolling-alea (18).png"), loadImage("./Assets/rolling-alea (19).png"), loadImage("./Assets/rolling-alea (20).png"),
		loadImage("./Assets/rolling-alea (21).png"), loadImage("./Assets/rolling-alea (22).png"), loadImage("./Assets/rolling-alea (23).png"), loadImage("./Assets/rolling-alea (24).png")
	];
}


function setup() {
	createCanvas(1000, 950);
	die = new Die(dieFaces, dieRollingFaces, {
		x: width / 2,
		y: height / 2
	});

	hud = new Hud(players, {
		x: 50,
		y: height/2 -70
	});
	gameController = new GameController(players, hud, die);
	
	bgImage.resize(width,height);
	background(255);
	//set up buttons
	//create buttons
	rollBetBTN = createButton('Roll Bet');
	rollNoBetBTN = createButton('Roll No Bet');
	holdBTN = createButton("Hold");
	playAgainBTN = createButton("Play Again");
	betEvenBTN = createButton('Even Number');
	betOddBTN = createButton('Odd Number');
	
	//set size
	rollBetBTN.size(100);
	rollNoBetBTN.size(100);
	holdBTN.size(100);
	playAgainBTN.size(100);
	betEvenBTN.size(100);
	betOddBTN.size(100);

	//Set their position
	rollBetBTN.position(width / 2 - 200, width / 2 - 200);
	rollNoBetBTN.position(width / 2 + 100, width / 2 - 200);
	holdBTN.position(width / 2 - 50, width / 2 - 200);
	playAgainBTN.position(width / 2 - 50, width / 2 - 200);
	betEvenBTN.position(width / 2-150, width / 2 - 200);
	betOddBTN.position(width / 2 + 45, width / 2 - 200);
	
	// Give them functions these are temp values change as needed
	rollBetBTN.mousePressed(gameController.rollBet);
	rollNoBetBTN.mousePressed(gameController.rollNoBet);
	holdBTN.mousePressed(gameController.nextPlayer);
	playAgainBTN.mousePressed(gameController.reset);
	betEvenBTN.mousePressed(gameController.evenBet);
	betOddBTN.mousePressed(gameController.oddBet)
	
	// Style the buttons
	styleAllButtons();
	
	hideALLButtons();
}

function draw() {
	// background(0); // since both use the same background it's best to remove it from the if else statements
	drawBackground();
	gameController.draw();

}


function keyPressed() {
	// Populates the players array with players and startes the game by setting startGame = true.
	if (gameController.startGame == false) {
		let numOfPlayer = key;
		//Check if numOPlayer is a valid number
		if (!isNaN(numOfPlayer)) {
			gameController.createPlayer(numOfPlayer);
		}
	}


	// For testing press T getting a random value
	if (keyCode == 84) {
		die.getRandomRoll();
	}

	// For testing press O start rolling animation
	if (keyCode == 79) {
		die.startRolling();
	}

	// For testing press O start rolling animation
	if (keyCode == 80) {
		die.stopRolling();
	}

}