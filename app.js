/**
 *  GET PLAYER ONE MARKER
 * START NEW GAME
 *
 *
 */

let marker1;
let marker2;
let player1 = '';
let player2 = 'AI';
let currentPlayer = '';
let playerArr = [];
let compArr = [];
let cellIdArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const DOM = {
	markerSelectorInput: document.querySelector('.marker__input'),
	playerOneInput: document.querySelector('.player__1'),
	startGameBtn: document.querySelector('.startBtn'),
	gameBoard: document.querySelector('.container'),
	startPage: document.querySelector('.game'),
	cellArr: Array.from(document.querySelectorAll('.cell')),
	newGameBtn: document.querySelector('.newBtn'),
};

const startGame = () => {
	// GET PLAYER 1 MARKER
	marker1 = DOM.markerSelectorInput.value;
	marker1 ? marker1 : (marker1 = 'X');
	// SET PLAYER MARKER
	marker1 === 'X' ? (marker2 = 'O') : (marker2 = 'X');
	// GET PLAYER MONICKER
	DOM.playerOneInput.value
		? (player1 = DOM.playerOneInput.value)
		: (player1 = 'Player 1');

	// RENDER GAMEBOARD
	DOM.startPage.style.opacity = 0;
	DOM.startPage.style.visibility = 'hidden';
	DOM.gameBoard.style.opacity = 1;
	DOM.gameBoard.style.visibility = 'visible';

	// RESET GAMEBOARD DISPLAY
	DOM.cellArr.forEach((cell) => {
		cell.textContent = '';
	});
};

const getCell = (cell) => {
	const selectedCell = +cell.dataset.id;

	if (
		playerArr.indexOf(selectedCell) < 0 &&
		compArr.indexOf(selectedCell) < 0
	) {
		playerArr.push(selectedCell);
		console.log(playerArr);
		currentPlayer = player1;

		return true;
	}
};

const computerPlay = () => {
	let compCell;
	// SHUFFLING THE CELL ID ARRAY
	cellIdArr.sort(() => Math.random() - 0.5);

	for (let i = 0; i < cellIdArr.length; i++) {
		if (playerArr.indexOf(cellIdArr[i]) < 0) {
			compCell = cellIdArr[i];
			compArr.push(compCell);
			cellIdArr.splice(i, 1);
			console.log(compArr);
			break;
		}
	}
	currentPlayer = player2;
	return compCell;
};

const displayMarker = (cell) => {
	if (currentPlayer === player1) {
		cell.textContent = marker1;
	} else if (currentPlayer === player2) {
		DOM.cellArr.forEach((c) => {
			if (+c.dataset.id === cell) {
				c.textContent = marker2;
			}
		});
	}
};

const newGame = () => {
	marker1 = '';
	marker2 = '';
	player1 = '';
	currentPlayer = '';
	playerArr = [];
	compArr = [];
	cellIdArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	// RERENDER DISPLAY
	DOM.startPage.style.opacity = 1;
	DOM.startPage.style.visibility = 'visible';
	DOM.gameBoard.style.opacity = 0;
	DOM.gameBoard.style.visibility = 'hidden';

	// RESET GAMEBOARD DISPLAY
	DOM.cellArr.forEach((cell) => {
		cell.textContent = '';
	});
};

const getWinner = () => {
	/**
	 * 678
	 * 345
	 * 012
	 *
	 * 012
	 * 048
	 * 036
	 * 147
	 * 246
	 * 258
	 * 345
	 * 678
	 */

	if (
		(playerArr.includes(0) && playerArr.includes(1) && playerArr.includes(2)) ||
		(playerArr.includes(0) && playerArr.includes(4) && playerArr.includes(8)) ||
		(playerArr.includes(0) && playerArr.includes(3) && playerArr.includes(6)) ||
		(playerArr.includes(1) && playerArr.includes(4) && playerArr.includes(7)) ||
		(playerArr.includes(2) && playerArr.includes(4) && playerArr.includes(6)) ||
		(playerArr.includes(2) && playerArr.includes(5) && playerArr.includes(8)) ||
		(playerArr.includes(6) && playerArr.includes(7) && playerArr.includes(8)) ||
		(playerArr.includes(3) && playerArr.includes(4) && playerArr.includes(5))
	) {
		alert(player1 + ' is the winner!');
		return true;
	} else if (
		(compArr.includes(0) && compArr.includes(1) && compArr.includes(2)) ||
		(compArr.includes(0) && compArr.includes(4) && compArr.includes(8)) ||
		(compArr.includes(0) && compArr.includes(3) && compArr.includes(6)) ||
		(compArr.includes(1) && compArr.includes(4) && compArr.includes(7)) ||
		(compArr.includes(2) && compArr.includes(4) && compArr.includes(6)) ||
		(compArr.includes(2) && compArr.includes(5) && compArr.includes(8)) ||
		(compArr.includes(6) && compArr.includes(7) && compArr.includes(8)) ||
		(compArr.includes(3) && compArr.includes(4) && compArr.includes(5))
	) {
		alert('AI is the winner!');
		return true;
	}
};

const disableBoard = () => {
	DOM.cellArr.forEach((cell) => {
		cell.disabled();
	});
};
const displayWinner = () => {};

// EVENT LISTENERS
DOM.startPage.addEventListener('submit', (e) => {
	startGame();
	e.preventDefault();
});

// setInterval(getWinner, 200);

DOM.cellArr.forEach((cell) =>
	cell.addEventListener('click', (e) => {
		const validWinner = getWinner();
		const validPlay = getCell(e.target);
		if (validWinner) {
			e.preventDefault();
		} else {
			displayMarker(cell);
			if (validPlay) {
				const compCell = computerPlay();
				displayMarker(compCell);
			}
		}
	})
);

DOM.newGameBtn.addEventListener('click', newGame);
