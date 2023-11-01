/**
 *  GET PLAYER ONE MARKER
 * START NEW GAME
 *
 *
 */

let marker1 = 'X';
let marker2 = '';
let player1 = '';
let player2 = 'AI';

const DOM = {
	markerSelectorInput: document.querySelector('.marker__input'),
	playerOneInput: document.querySelector('.player__1'),
	startGameBtn: document.querySelector('.startBtn'),
	gameBoard: document.querySelector('.container'),
	startPage: document.querySelector('.game'),
	cellArr: Array.from(document.querySelectorAll('.cell')),
};
const startGame = () => {
	// GET PLAYER 1 MARKER
	marker1 = DOM.markerSelectorInput.value;
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

// DOM.startGameBtn.addEventListener('click', startGame);
DOM.startPage.addEventListener('submit', (e) => {
	startGame();
	e.preventDefault();
});
