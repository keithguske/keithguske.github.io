const cellLength = 20;

function render(board) {
    const canvas = document.getElementById("canvas");
    setSize(board, canvas);

    //Create a stage by getting a reference to the canvas
    const stage = new createjs.Stage(canvas);
    
    //Create a Shape DisplayObject.
    //const circle = new createjs.Shape();
    //circle.graphics.beginFill("red").drawCircle(50, 50, 50);
    
    //Set position of Shape instance.
    //circle.x = circle.y = 50;

    for(var i = 0; i < board.cells.length; i++) {
	for(var j = 0; j < board.cells[i].length; j++) {
	    const currentCell = board.cells[i][j];
	    var shape;
	    if(currentCell == undefined) {
		//shape = drawBlock(i, j);
		//stage.addChild(shape);
		continue;
	    }

	    switch(currentCell.constructor.name) {
	    case "ForwardCell":
		shape = drawForwardCell(currentCell, i, j);
		stage.addChild(shape[0]);
		stage.addChild(shape[1]);
		break;
	    case "RightCell":
		shape = drawRightCell(currentCell, i, j);
		stage.addChild(shape);
		break;
	    case "LeftCell":		
		shape = drawLeftCell(currentCell, i, j);
		stage.addChild(shape);
		break;

	    }

	    

	}
    }
    
    //Add Shape instance to stage display list.
    //stage.addChild(circle);
    //Update stage will render next frame
    stage.update();
}

function drawBlock(i, j) {
    const block = new createjs.Graphics();
    block.beginStroke("black").beginFill("black");
    block.drawRect(j * cellLength, i * cellLength, cellLength, cellLength);
    return new createjs.Shape(block);
}

function drawForwardCell(cell, i, j) {
    //const lines = new createjs.Graphics();
    const lines = [];
    const y = i * cellLength, x = j * cellLength;
    
    if(cell.direction == 'N' || cell.direction == 'S') {
	var line = new createjs.Graphics();
	
	line.beginStroke("black");
	line.moveTo(x, y);
	line.lineTo(x, y + cellLength);
	lines.push(new createjs.Shape(line));
	//lines.endStroke();

	line = new createjs.Graphics();
	line.beginStroke("black");
	line.moveTo(x + cellLength, y);
	line.lineTo(x + cellLength, y + cellLength);
	lines.push(new createjs.Shape(line));
	//lines.endStroke();
    }
    else {
	var line = new createjs.Graphics();
	line.beginStroke("black");
	line.moveTo(x, y);
	line.lineTo(x + cellLength, y);
	lines.push(new createjs.Shape(line));
	//lines.endStroke();

	line = new createjs.Graphics();
	line.beginStroke("black");
	line.moveTo(x, y + cellLength);
	line.lineTo(x + cellLength, y + cellLength);
	lines.push(new createjs.Shape(line));
	//lines.endStroke();
    }
    return lines;
}

function drawRightCell(cell, i, j) {
    const y = i * cellLength, x = j * cellLength;
    const line = new createjs.Graphics();
    line.beginStroke("black");

    switch(cell.direction) {
    case 'N':
	line.moveTo(x, y);
	line.lineTo(x, y + cellLength);
	line.lineTo(x + cellLength, y + cellLength);
	break;
    case 'E':
	line.moveTo(x + cellLength, y);
	line.lineTo(x, y);
	line.lineTo(x, y + cellLength);
	break;
    case 'S':
	line.moveTo(x, y);
	line.lineTo(x + cellLength, y);
	line.lineTo(x + cellLength, y + cellLength);
	break;
    case 'W':
	line.moveTo(x + cellLength, y);
	line.lineTo(x + cellLength, y + cellLength);
	line.lineTo(x, y + cellLength);
	break;
    }

    return new createjs.Shape(line);
}

function drawLeftCell(cell, i, j) {
    const y = i * cellLength, x = j * cellLength;
    const line = new createjs.Graphics();
    line.beginStroke("black");

    switch(cell.direction) {
    case 'E':
	line.moveTo(x, y);
	line.lineTo(x, y + cellLength);
	line.lineTo(x + cellLength, y + cellLength);
	break;
    case 'S':
	line.moveTo(x + cellLength, y);
	line.lineTo(x, y);
	line.lineTo(x, y + cellLength);
	break;
    case 'W':
	line.moveTo(x, y);
	line.lineTo(x + cellLength, y);
	line.lineTo(x + cellLength, y + cellLength);
	break;
    case 'N':
	line.moveTo(x + cellLength, y);
	line.lineTo(x + cellLength, y + cellLength);
	line.lineTo(x, y + cellLength);
	break;
    }

    return new createjs.Shape(line);
}

function setSize(board, canvas) {
    canvas.width = board.cells.length * cellLength;
    canvas.height = board.cells[0].length * cellLength;
}
