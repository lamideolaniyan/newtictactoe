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
const playerArr = [];

const DOM = {
	markerSelectorInput: document.querySelector('.marker__input'),
	playerOneInput: document.querySelector('.player__1'),
	startGameBtn: document.querySelector('.startBtn'),
	gameBoard: document.querySelector('.container'),
	startPage: document.querySelector('.game'),
	cellArr: Array.from(document.querySelectorAll('.cell')),
	newGameBtn: Array.from(document.querySelectorAll('.newBtn')),
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
	playerArr.push(selectedCell);

	console.log(playerArr);
};

const displayMarker = (cell) => {
	cell.textContent = marker1;
};
const newGame = () => {};

// EVENT LISTENERS
// DOM.startGameBtn.addEventListener('click', startGame);
DOM.startPage.addEventListener('submit', (e) => {
	startGame();
	e.preventDefault();
});

DOM.cellArr.forEach((cell) =>
	cell.addEventListener('click', (e) => {
		getCell(e.target);
		displayMarker(e.target);
	})
);
