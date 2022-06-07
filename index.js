
const X_CLASS = "x";
const O_CLASS = "o";
const gridElement = document.querySelector(".grid");
const squares = document.querySelectorAll(".square");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentClass = X_CLASS;
let turn = "x";

const init = function () {
  squares.forEach((square) => {
    square.classList.remove(X_CLASS);
    square.classList.remove(O_CLASS);
  });
};

const handleClick = function (event) {
  if (!event.target.classList.contains("square")) return;
  if (event.target.classList.contains(X_CLASS)) return;
  if (event.target.classList.contains(O_CLASS)) return;

  const square = event.target;

  placeMark(square);

  if (isWin()) {
    finishGame(`${turn}'s win. Press OK to Play Again`);
  } else if (isDraw()) {
    finishGame("Draw. Press OK to play Again");
  } else {
    swapTurns();
  }
};

const finishGame = function (message) {
  setTimeout(function () {
    if (confirm(message)) {
      init();
    } else {
      gridElement.removeEventListener("click", handleClick);
    }
  }, 100);
};

const placeMark = function (square) {
  square.classList.add(currentClass);
};

const swapTurns = function () {
  turn = turn == "x" ? "o" : "x";
  currentClass = turn == "x" ? X_CLASS : O_CLASS;
};

const isWin = function () {
  return winningCombinations.some((combination) =>
    combination.every((index) =>
      squares[index].classList.contains(currentClass)
    )
  );
};

const isDraw = function () {
  return [...squares].every(
    (square) =>
      square.classList.contains(X_CLASS) || square.classList.contains(O_CLASS)
  );
};

gridElement.addEventListener("click", handleClick);
