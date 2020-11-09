// Button Utilities handles button visuals


// Hide all buttons
function hideALLButtons() {
	holdBTN.hide();
	rollBetBTN.hide();
	rollNoBetBTN.hide();
	playAgainBTN.hide();
	betEvenBTN.hide();
	betOddBTN.hide();
}

// Hide gameplay buttons like hold roll and roll with not bet
function hideGameplayButtons() {
	holdBTN.hide();
	rollBetBTN.hide();
	rollNoBetBTN.hide();
	// betEvenBTN.hide();
	// betOddBTN.hide();
}

// Show gameplay buttons like hold roll and roll with not bet
function showGameplayButtons() {
	// if game is already over cancel;
	if (gameController.winner == true) {
		return;
	}
	rollBetBTN.show();
	rollNoBetBTN.show();
	holdBTN.show();
}
function showBetButtons() {
	betEvenBTN.show();
	betOddBTN.show();
}
function hideBetButtons() {
	betEvenBTN.hide();
	betOddBTN.hide();
}

// Add style to a button
function styleButton(button) {
	let bgColor = color(255, 255, 255);
	button.style('background-color', 'white');
	button.style('border', '1px solid grey');
	button.style('border-radius', '25px');
	button.style('height', '35px');
	button.style('font-weight', 'bold');
}

// Apply style to all buttons
function styleAllButtons() {
[holdBTN, rollBetBTN, rollNoBetBTN, playAgainBTN, betEvenBTN, betOddBTN].forEach(el => styleButton(el));
}