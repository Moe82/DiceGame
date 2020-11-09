// Displays the score.
class Hud {
	constructor(players = [], position = { x: 0, y: 0}) {
		this.players = players;
		this.position = position;
	}

	// Displays all players information
	displayScore() {
		this.playersCurrentPoints();
		this.playersTotalWins();
	}

	// Display all player's current points
	playersCurrentPoints() {
		//Offets for the distance between elements
		let titleXOffset = 35;
		let titleYOffset = 70;
		let playerRowOffset = 50;
		
		let boxWidth  = 300;
		let boxHeight = (this.players.length + 1) * playerRowOffset + 5;

		push();
		bgPanel(this.position.x + titleXOffset - 10, this.position.y -40, boxWidth,boxHeight);
		fill(255, 0, 0);
		textSize(32);
		textAlign(LEFT);
		text("Points", this.position.x + titleXOffset, this.position.y);
		fill(0, 0, 255);
		for (let x = 0; x < this.players.length; x++) {
			text("Player " + this.players[x].ID + ": " + this.players[x].getPoints() + (this.players[x].lost == true ? ("(LOST)") : ("")), this.position.x + titleXOffset + 12, this.position.y + ((x+1) * playerRowOffset));
		}
		pop();
	}

	// Display all player's total wins
	playersTotalWins() {
		// Offsets for the distance between elements
		
		let titleXOffset = width/2 + 60;
		let playerRowOffset = 50;
		let playerColumnOffset = 585;
		
		let boxWidth  = 300;
		let boxHeight = (this.players.length + 1) * playerRowOffset + 5;

		push();
		bgPanel(this.position.x + titleXOffset - 10, this.position.y -40, boxWidth,boxHeight);
		fill(255, 0, 0);
		textSize(32);
		textAlign(LEFT);
		text("Games Won", this.position.x + titleXOffset, this.position.y);
		fill(0, 0, 255);
		for (let c = 0; c < this.players.length; c++) {
			text("Player " + this.players[c].ID + ": " + this.players[c].totalWins, this.position.x + playerColumnOffset, this.position.y + ((c+1) * playerRowOffset));
		}
		pop();
	}
}