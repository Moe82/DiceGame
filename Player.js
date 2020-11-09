class Player {
	constructor(id = 0) {
		this.points = 0;
		this.hold = false;
		this.bet = 0;
		this.lost = false // True is the player lost (went over 21).
		this.ID = id;
		this.totalWins = 0;
		this.rollTime = 2500; // Amount of seconds the dice will roll 1000 = 1 second
	}

	// Get player's points
	getPoints() {
		return this.points;
	}

	// Get player ID
	getID() {
		return this.ID;
	}

	// Get Player wins
	getWins() {
		return this.totalWins;
	}
	
	// Add one win tp player
	increaseWins(){
		this.totalWins++;
	}

	// Set a player status to lost
	lost() {
		this.lost = true;
	}

	//Roll with a bet
    rollBet() {
		showBetButtons();
		if (betEvenBTN.mousePressed){
			this.evenBet;
			
		}
		if(betOddBTN.mousePressed){
			this.oddBet;
		}
	}

	//Determines whether the roll was an even number
	evenBet() {
		die.getRandomRoll();
		if (die.getDieValue()%2 == 0) {
			this.increasePoints(die.getDieValue() *2);
		}
		else {
			this.decreasePoints(die.getDieValue());
		}
		
	}
	
	//Determines whether the roll was an odd number
	oddBet() {
		die.getRandomRoll();
		if(die.getDieValue()%2 !=0) {
			this.increasePoints(die.getDieValue()*2);
		} else {
			this.decreasePoints(die.getDieValue());
		}
	}

	// Roll without a bet
	rollNoBet() {
		// If roll was without bet
		// increase points by the result rolled
			this.increasePoints(die.getRandomRoll());
	}

	// increasePoints receives an integer argument and adds that amount this.points
	increasePoints(points) {
		this.points += points;
	}

	// decreasePoints receives an integer argument and subtracts that amount from this.points
	// If this.points is less than zero after this process set it to zero
	// NO NEGATIVE NUMBERS
	decreasePoints(points) {
		this.points -= points;
		// don't let points go below 0
		if (this.points < 0) {
			this.points = 0;
		}
	}
	
	// Informs if the player is holding or not
	isHolding() {
		return this.hold;
	}
	// Set players status to holding
	hold() {
		this.hold = true;
	}
}