import Board from "./Board";
import '../styles/Game.css';
import { VscDebugRestart } from "react-icons/vsc";

function Game() {

  function restartGame() {
    window.location.reload();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-restart">
        <VscDebugRestart />
        <button className="game-restart-button" onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
}


export default Game;