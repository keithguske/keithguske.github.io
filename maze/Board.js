class Board {
    constructor(maxLength, maxWidth) {
	this.maxLength = maxLength;
	this.maxWidth = maxWidth;
	
	this.cells = new Array(maxLength * 2 + 1)
	for(var i = 0; i < this.cells.length; i++) {
	    this.cells[i] = new Array(maxWidth * 2 + 1);
	}

	this.position = {
	    x: maxLength,
	    y: maxWidth
	}

	this.stack = [];
	this.cells[this.position.x][this.position.y] = new IntersectionCell('N');
	this.stack.push(Object.assign({}, this.position));

	this.seed = 500;
    }

    getCurrentCell() {
	return this.cells[this.position.x][this.position.y];
    }

    isValidPosition(x, y) {
	return x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length && this.cells[x][y] == undefined;
    }

    isNorthValid() {
	return this.isValidPosition(this.position.x - 1, this.position.y);
    }

    isEastValid() {
	return this.isValidPosition(this.position.x, this.position.y + 1);
    }

    isSouthValid() {
	return this.isValidPosition(this.position.x + 1, this.position.y);
    }

    isWestValid() {
	return this.isValidPosition(this.position.x, this.position.y - 1);
    }
    
    // For testing purposes
    random() {
	const x = Math.sin(this.seed++) * 10000;
	return x - Math.floor(x);
    }

    newRandomCell(direction) {
	if(!this.isValidPosition(this.position.x, this.position.y)) {
	    alert();
	}
	const rand = Math.floor(Math.random() * Math.floor(4)) + 1;
	switch(rand) {
	case 1:
	    return new ForwardCell(direction);
	case 2:
	    return new RightCell(direction);
	case 3:
	    return new LeftCell(direction);
	case 4:
	    this.stack.push(Object.assign({}, this.position));
	    //console.log(JSON.stringify(this.stack));
	    return new IntersectionCell(direction);
	}
    }

    canContinue() {
	if(this.getCurrentCell().constructor.name == 'IntersectionCell') {
	    if(this.isNorthValid() || this.isSouthValid() || this.isEastValid() || this.isWestValid()) {
		this.stack.push(Object.assign({}, this.position));
		return true;
	    }
	}

	if(this.stack.length > 0) return true;

	return false;
    }

    play() {
	while(this.canContinue()) {
	    if(typeof this.position.x == 'string') this.position.x = Number(this.position.x);
	    if(typeof this.position.y == 'string') this.position.y = Number(this.position.y);

	    if(this.getCurrentCell().constructor.name == 'IntersectionCell') {
		switch(this.getCurrentCell().direction) {
		case 'N':
		    if(this.isNorthValid()) {
			this.position.x--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('N');
		    }
		    else if(this.isEastValid()) {
			this.position.y++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('E');
		    }
		    else if(this.isSouthValid()) {
			this.position.x++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('S');
		    }
		    else if(this.isWestValid()) {
			this.position.y--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('W');
		    }
		    else {
			//console.log(this.position, this.getCurrentCell().direction);
			this.position = Object.assign({},this.stack.pop());
		    }
		    break;
		    
		case 'E':		    
		    if(this.isEastValid()) {
			this.position.y++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('E');
		    }
		    else if(this.isSouthValid()) {
			this.position.x++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('S');
		    }
		    else if(this.isWestValid()) {
			this.position.y--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('W');
		    }
		    else if(this.isNorthValid()) {
			this.position.x--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('N');
		    }
		    else {
			//console.log(this.position, this.getCurrentCell().direction);
			this.position = Object.assign({},this.stack.pop());
		    }

		    break;
		    
		case 'S':		    
		    if(this.isSouthValid()) {
			this.position.x++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('S');
		    }
		    else if(this.isWestValid()) {
			this.position.y--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('W');
		    }
		    else if(this.isNorthValid()) {
			this.position.x--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('N');
		    }
		    else if(this.isEastValid()) {
			this.position.y++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('E');
		    }
		    else {
			//console.log(this.position, this.getCurrentCell().direction);
			this.position = Object.assign({},this.stack.pop());
		    }

		    break;
		    
		case 'W':		    
		    if(this.isWestValid()) {
			this.position.y--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('W');
		    }
		    else if(this.isNorthValid()) {
			this.position.x--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('N');
		    }
		    else if(this.isEastValid()) {
			this.position.y++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('E');
		    }
		    else if(this.isSouthValid()) {
			this.position.x++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('S');
		    }
		    else {
			//console.log(this.position, this.getCurrentCell().direction);
			this.position = Object.assign({},this.stack.pop());
		    }

		    break;
		}
	    }

	    // For every other type
	    else {
		switch(this.getCurrentCell().direction) {
		case 'N':
		    if(this.isNorthValid()) {
			this.position.x--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('N');
		    }
		    else {
			this.position = Object.assign({}, this.stack[this.stack.length - 1]);
		    }
		    break;
		    
		case 'E':
		    if(this.isEastValid()) {
			this.position.y++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('E');
		    }
		    else {
			this.position = Object.assign({}, this.stack[this.stack.length - 1]);
		    }
		    break;
		    
		case 'S':
		    if(this.isSouthValid()) {
			this.position.x++;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('S');
		    }
		    else {
			this.position = Object.assign({}, this.stack[this.stack.length - 1]);
		    }
		    break;
		    
		case 'W':
		   if(this.isWestValid()) {
			this.position.y--;
			this.cells[this.position.x][this.position.y] = this.newRandomCell('W');
		    }
		    else {
			this.position = Object.assign({}, this.stack[this.stack.length - 1]);
		    }
		    break;
		}
	    }
	    // this.print();
	}
    }

    print() {
	var screen = '';
	for(var i = 0; i < this.cells.length; i++) {
	    var row = '';
	    for(var j = 0; j < this.cells[i].length; j++) {
		if(this.cells[i][j] == undefined)
		    row += ' ';
		else
		    row += this.cells[i][j].print();
	    }
	    screen += row + '\n';
	}
	console.log(screen);
    }
}


