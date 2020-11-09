// Die generate a random number between 1-6

class Die {
	// Default values are faces = an empty array, position is x = 0 and y = 0
	constructor(faces = [], rollingFaces = [], position = {
		x: 0,
		y: 0
	}) {
		this.faces = faces;
		this.faceValue = this.getRandomRoll(); // Value of the die
		this.rollingFaces = rollingFaces
		this.rollingIndex = 0;
		this.position = position;
		this.isRolling = false;
		this.rollRate = 8; // Frame rate delay
	}

	// Get a random integer from 1-6
	randomNumber() {
		return random([1, 2, 3, 4, 5, 6]);
	}

	// Roll die for a random value
	getRandomRoll() {
		this.faceValue = this.randomNumber();
		return this.faceValue;
	}

	// Get the current value of the die
	getDieValue() {
		return this.faceValue;
	}

	// Draws the current state of the die
	draw() {
		push()
		imageMode(CENTER);
		if (this.isRolling)
			this.handleRolling();
		else // Draw current die value
			image(this.faces[this.faceValue - 1], this.position.x, this.position.y);
		pop();
	}

	//Start die rolling animation
	startRolling() {
		this.isRolling = true;
	}

	//Stop die rolling animation	
	stopRolling() {
		this.isRolling = false;
	}
	// Animate a rolling die
	handleRolling() {
		if (frameCount % this.rollRate == 0) // Keeps animation framerate low
			this.rollingIndex++;
		if (this.rollingIndex == this.rollingFaces.length)
			this.rollingIndex = 0;
		image(this.rollingFaces[this.rollingIndex], this.position.x, this.position.y);
	}

}