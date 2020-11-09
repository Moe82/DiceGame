class GameController {
	constructor(players = [], hud = null, die = null) {
		this.hud = hud; // Reference to hud
		this.die = die; // Reference to die
		this.startGame = false;
		this.winner = false; // true when a winner is found 
		this.winningPlayer = null;
		this.roundCounter = 0;
		this.rollTime = 1500; // Amount of seconds the dice will roll 1000 = 1 second

		// Bind methods to game controller instance
		this.nextPlayer = this.nextPlayer.bind(this);
		this.checkWinner = this.checkWinner.bind(this);
		this.rollBet = this.rollBet.bind(this);
		this.rollNoBet = this.rollNoBet.bind(this);
		this.reset = this.reset.bind(this);
		this.handleWinner = this.handleWinner.bind(this);
		this.endOfGameWinner = this.endOfGameWinner.bind(this);
		this.displayInstructions = this.displayInstructions.bind(this);
		this.evenBet = this.evenBet.bind(this);
		this.oddBet = this.oddBet.bind(this);
	}

	// Draws the game
	draw() {
		if (this.winner == true) {
			this.handleWinner();
		} else if (this.startGame == false) {
			this.getNumberOfPlayerScreen();
		} else {
			this.hud.displayScore();
			this.die.draw();
			this.displayRoundInfo();
			this.displayInstructions();
		}
	}

	// Show winner screen
	handleWinner() {
		push();
		textSize(32);
		rectMode(CENTER);
		bgPanel(width / 2, height / 2 - 210, 350, 50, color(41, 41, 41));
		textAlign(CENTER);
		fill(0, 225, 0);
		if (this.winningPlayer.ID > 0)
			text("Player " + this.winningPlayer.ID + " is the winner!", width / 2, height / 2 - 200);
		else
			text("No Winners this round", width / 2, height / 2 - 200);
		pop();
		this.hud.displayScore();

	}

	//Show round informations
	displayRoundInfo() {
		let xPosition = width / 2;
		let yPosition = height / 2 - 350;
		push();
		textSize(32);
		rectMode(CENTER);
		textAlign(CENTER);
		bgPanel(xPosition, yPosition + 10, 650, 100, color(41, 41, 41));
		fill(255, 165, 0);
		text("Round " + this.roundCounter + "/7", xPosition, yPosition);
		fill(0, 225, 0);
		text("Player " + currPlayer.ID + ", click a button below to continue.", xPosition, yPosition + 40);

		pop();
	}

	// Show player instructions
	displayInstructions() {
		let titleXposition = width / 2;
		let titleYPostion = height - 240;
		let textXPosition = titleXposition - 300
		let textYPosition = titleYPostion + 25;
		let textYOffset = 18;

		let boxWidth = 700;
		let boxHeight = 190;

		push();
		bgPanel(titleXposition - (boxWidth / 2), titleYPostion - 20, boxWidth, boxHeight, color(41, 41, 41));
		fill(255, 255, 255);
		textSize(16);
		textAlign(CENTER);
		text("How to play", titleXposition, titleYPostion);
		textAlign(LEFT);
		text("I.  Each player rolls a die and is awarded points equal to number that the die lands on.", textXPosition, textYPosition);
		text("II.  A game consists of 7 rounds and a round is complete after all players roll. ", textXPosition, textYPosition + (textYOffset * 1));
		text("III.  The first player to accumulate exactly 21 points wins the game automatically.", textXPosition, textYPosition + (textYOffset * 2));
		text("IV.	If no player hits 21 by the end of the 7th round, the player who is closest to 21 ", textXPosition, textYPosition + (textYOffset * 3));
		text("(excluding those who went above 21) wins the game.", textXPosition, textYPosition + (textYOffset * 4));
		text("V.  A player can choose not to roll (hold), roll with a bet, or roll without a bet. ", textXPosition, textYPosition + (textYOffset * 5));
		text("VI.  If a players bets they can choose between an even or odd roll. If they guess correctly", textXPosition, textYPosition + (textYOffset * 6));
		text("they will be awarded double the points if not they lose the die value in points", textXPosition, textYPosition + (textYOffset * 7));
		pop();
	}

	// resets the state of the game
	reset() {
		for (let a = 0; a < players.length; a++) {
			players[a].points = 0;
			players[a].lost = false;
		}
		this.winner = false;
		this.startGame = true;
		rollBetBTN.show();
		rollNoBetBTN.show();
		holdBTN.show();
		playAgainBTN.hide();
		this.roundCounter = 0;
	}

	// Roll with no bet
	rollNoBet() {
		this.startRoll();
		setTimeout(() => {
			currPlayer.rollNoBet()
			this.checkWinner();
			this.endRoll();
		}, this.rollTime);
	}

	// Start the a roll with a bet
rollBet() {
		this.startRoll();
		showBetButtons();
	}
	
//Start animations and calculations on clicking the even bet button
evenBet() {
		hideBetButtons();
		setTimeout(() => {
			currPlayer.evenBet();
			this.checkWinner();
			this.endRoll();
		}, this.rollTime * 0.8);
	}
	
//Start animations and calculations on clicking the odd bet button
oddBet() {
		hideBetButtons();
		setTimeout(() => {
			currPlayer.oddBet();
			this.checkWinner();
			this.endRoll();
		}, this.rollTime * 0.8);
	}


	// shifts currPlayer to the next player that has not lost. A bit Confusing, but it works well. Turn into a recursive function later.
	nextPlayer() {
		let x = currPlayer.ID;
		for (x; x < (players.length + 1); x++) {
			if (x != players.length) {
				if (players[x].lost == false) {
					currPlayer = players[x];
					return;
				}
			} else {
				this.roundCounter += 1;
				if (this.roundCounter >= 7) {
					this.endOfGameWinner();
				}
				for (let c = 0; c < players.length; c++) {
					if (players[c].lost == false) {
						currPlayer = players[c];
						return;
					}
				}
			}
			this.endOfGameWinner();
		}
	}


	/* If the next player lost, call the findNext function.
	(x != players.length) ? (players[x].lost == true? (this.findNext) : (currPlayer = players[x]) ) : (currPlayer = players[0]);
	*/

	// checks if the current player won. Also checks for the special case in which all players lost. 
	checkWinner() {
		if (currPlayer.points == 21) {
			this.winner = true
			this.winningPlayer = currPlayer;
			currPlayer.totalWins += 1;
			rollBetBTN.hide();
			rollNoBetBTN.hide();
			holdBTN.hide();
			playAgainBTN.show();
			return;
		} else if (currPlayer.points > 21) {
			currPlayer.lost = true;

		}
		this.nextPlayer();
	}

	// Couldn't think of a quote for this function. It calcualtes the winner if the 7 rounds are over
	endOfGameWinner() {
		// let delta = 99;
		// for (let x = 0; x < players.length; x++) {
		// 	if (players[x].points < 21) {
		// 		if ((21 - players[x].points) < delta) {
		// 			delta = (21 - players[x].points);
		// 			this.winningPlayer = players[x];
		// 			currPlayer = players[x]; // important for line 147
		// 		}
		// 	}
		// }

		// Find all player that can be winners
		let candidates = players.filter(player => player.getPoints() <= 21);
		// If candidates is empty than everyone is over 21 and lost no winner
		if (candidates.length !== 0) {
			// Find the player with highest score
			let tempWinner = candidates.reduce((winner, contender) => winner.getPoints() >= contender.getPoints() ? winner : contender);
			tempWinner.increaseWins();
			this.winningPlayer = tempWinner;
		} else {
			// Create a negative player to signal that no winner was found
			this.winningPlayer = new Player(-1)
		}
		this.winner = true;
		rollBetBTN.hide();
		rollNoBetBTN.hide();
		holdBTN.hide();
		playAgainBTN.show();
		return;
	}


	// Intro message for the number of players in the game
	getNumberOfPlayerScreen() {
		let boxWidth = 450;
		let boxHeight = 50;
		push();
		rectMode(CENTER);
		bgPanel(width / 2, height / 3 - 10, boxWidth, boxHeight);
		fill(0, 0, 255);
		textSize(32);
		textAlign(CENTER);
		text("Enter Number of Players: 1-5", width / 2, height / 3);
		pop();
	}

	// Create x amount of player
	createPlayer(numOfPlayers = 0) {
		if (numOfPlayers > 5) // cap the number of players to 5
			numOfPlayers = 5;
		for (let x = 0; x < numOfPlayers; x++) {
			players.push(new Player());
			players[x].ID = (x + 1);
		}

		this.startGame = true;
		rollBetBTN.show();
		rollNoBetBTN.show();
		holdBTN.show();
		currPlayer = players[0];

	}

	// Start the dice rolling
	startRoll() {
		die.startRolling();
		hideGameplayButtons();
	}

	// Stop the dice rolling
	endRoll() {
		die.stopRolling();
		showGameplayButtons();
	}

}