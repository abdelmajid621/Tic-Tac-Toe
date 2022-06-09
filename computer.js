

const bestMove = function () {
    let bestSquare;
    let bestScore = -Infinity;
    [...squares].map((square) => {
      if (isEmptySquare(square)) {
        placeMark(square);
        swapTurns();
        const score = minimax(squares, false);
        removeMark(square);
        swapTurns();
        if (bestScore < score) {
          bestSquare = square;
          bestScore = score;
        }
      }
    });
  
    placeMark(bestSquare);
  };
  
  const isEmptySquare = function (square) {
    return (
      !square.classList.contains(O_CLASS) && !square.classList.contains(X_CLASS)
    );
  };
  
  const removeMark = function (square) {
    square.classList.remove(X_CLASS);
    square.classList.remove(O_CLASS);
  };
  
  const minimax = function (squares, maximazingPlayer) {
    if (isWin()) return turn == "x" ? 1 : -1;
    if (isDraw()) return 0;
  
    if (maximazingPlayer) {
      let maxScore = -Infinity;
      [...squares].map((square) => {
        if (isEmptySquare(square)) {
          placeMark(square);
          swapTurns();
          const score = minimax(squares, false);
          swapTurns();
          removeMark(square);
          maxScore = Math.max(score, maxScore);
        }
      });
      return maxScore;
    } else {
      let minScore = Infinity;
      [...squares].map((square) => {
        if (isEmptySquare(square)) {
          placeMark(square);
          swapTurns();
          const score = minimax(squares, true);
          swapTurns();
          removeMark(square);
          minScore = Math.min(score, minScore);
        }
      });
      return minScore;
    }
  };