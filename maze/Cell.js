class Cell {
    constructor(direction) {
	this.direction = direction;
    }

    print() {
	switch(this.direction) {
	case 'N':
	    return '↑';
	    break;
	case 'E':
	    return '→';
	    break;
	case 'S':
	    return '↓';
	    break;
	case 'W':
	    return '←';
	    break;
	}
    }
}

class ForwardCell extends Cell {
    constructor(direction) {
	super(direction);
    }
}

class RightCell extends Cell {
    constructor(direction) {
	switch(direction) {
	case 'N':
	    super('E');
	    break;
	case 'E':
	    super('S');
	    break;
	case 'S':
	    super('W');
	    break;
	case 'W':
	    super('N');
	    break;
	}
    }
}

class LeftCell extends Cell {
    constructor(direction) {
	switch(direction) {
	case 'N':
	    super('W');
	    break;
	case 'E':
	    super('N');
	    break;
	case 'S':
	    super('E');
	    break;
	case 'W':
	    super('S');
	    break;
	}
    }
}

class IntersectionCell extends Cell {
    constructor(direction) {
	super(direction);
    }

    print() {
	return '+'
    }
}
