const button = document.getElementById('button');
const input = document.getElementById('input');

button.addEventListener('click', renderRequest, true);

function renderRequest() {
    const size = input.value;
    if(isNaN(size) || size < 1 || size > 250) {
	alert('Invalid size');
	return;
    }

    const board = new Board(size, size);
    board.play();
    board.print();
    
    render(board);
}
