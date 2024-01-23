import '../styles/Cuadrado.css'

function Square({ value, onSquareClick, isWinnerSquare, isX, winner }) {
  return (
    <button
      className={`square ${isWinnerSquare ? 'winner':''} ${isX ? 'x':'o'} ${winner ? 'deactivate':''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;