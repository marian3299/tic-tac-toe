import Square from "./Square";
import '../styles/Board.css';
import { useState} from "react";

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);
  const [draws, setDraws] = useState(0);
  const [showNewGameButton, setShowNewGameButton] = useState(false);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (winner.winner === 'X') {
        setWinsX(prevWinsX => prevWinsX + 1);
      } else if (winner.winner === 'O') {
        setWinsO(prevWinsO => prevWinsO + 1);
      }
      setShowNewGameButton(true);
    } else if (nextSquares.every(square => square !== null)) {
      setDraws(prevDraws => prevDraws + 1);
      setShowNewGameButton(true);
    }
  }

  function restartBoard() {
    setSquares(Array(9).fill(null));
    setShowNewGameButton(false);
  }


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.winner;
  } else if (squares.every((square => square !== null))) {
    status = 'Tie!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquares = i => {
    return(
      <Square
        value={squares[i]}   
        onSquareClick={() => handleClick(i)}
        isWinnerSquare={winner && winner.winningSuqares.includes(i)} 
        isX={squares[i] === 'X'} 
        winner = {winner}
        key={i}
      />
    );
  };

  const renderBoardRow = start => {
    return(
      <div className="board-row" key={start}>
        {[0, 1, 2].map(offset => renderSquares(start + offset))}
      </div>
    );
  };
  
  return (
    <>
      <div className="score-container">
        <div className="score player-x">
          <p>PLAYER X</p>
          <p>{winsX}</p>
        </div>

        <div className="score draw">
          <p>DRAW</p>
          <p>{draws}</p>
        </div>

        <div className="score player-o">
          <p>PLAYER O</p>
          <p>{winsO}</p>
        </div>
      </div>

      <div className="board">
        {[0, 3, 6].map(start => renderBoardRow(start))}
      </div>

      <div className={`status-container ${xIsNext ? 'status-x' : 'status-o'} ${showNewGameButton ? 'not-winner' : ''}`}>
        <div className='status'>{status}</div>
      </div>

      <div className={`new-game-container ${showNewGameButton ? '' : 'not-winner'}`}>
        <button
          className="new-game"
          onClick={restartBoard}
        >
          New Game
        </button>
      </div>


    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSuqares: [a, b, c] };
    }
  }
  return null;
}

export default Board;