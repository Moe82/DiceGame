// Graphics Utilities  handles visual helpers


// Draw a rect panel with rounded borders
function bgPanel(x = 0, y = 0, panelWidth = 10, panelHeight = 10, pColor = color(255, 255,255)) {
	push()
	fill(pColor);
	rect(x, y, panelWidth, panelHeight, 20);
	pop()
}

// Draw background
function drawBackground(){
	push()
	noFill();
	stroke(240, 240, 240);
	strokeWeight(20);
	image(bgImage, 0 , 0);
	rect(0,0, width, height, 20);
	pop();