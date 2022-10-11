import {
  isDisabled,
  setSelectionRange,
} from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import "./App.css";
import Square from "./components/Square";

// const drawGame = squares.every(value => value !== null)

const App = () => {
  //////////---------- SET STATES ----------//////////
  // Empty array that will contain our <Square /> component.
  const [squares, setSquares] = useState(Array(9).fill(null));
  // Stores the current move of the players.
  const [player, setPlayer] = useState("☀️");
  // Updates the status message.
  const [playerStatus, setPlayerStatus] = useState("Click a square to start.");
  // Will toggle gameplay, disabling clicks once a win/tie condition has been met.
  const [gameOn, setGameOn] = useState(true);

  ////////////////--------------- FUNCTIONS ---------------////////////////

  /////***---------- RESET BOARD ----------***///////
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setPlayerStatus("Click a square to start.");
    setPlayer("☀️");
    setGameOn(true);
  };
  //////////---------- WIN CHECK / CONDITIONAL ----------//////////
  const calculateWinner = (squares) => {
    const winsArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winsArr.length; i++) {
      const [a, b, c] = winsArr[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // If this returns true, return the value of player.
        return squares[a];
      }
    }
    // Otherwise, return null.
    return null;
  };

  //////////---------- TIE CHECK ----------//////////
  const calculateTie = (squares) => {
    if (gameOn && squares.every((v) => v !== null)) {
      return true;
    } else {
      return false;
    }
  };

  //////////---------- CONDITIONAL ----------//////////
  if (gameOn) {
    // If the game is running and the value our winning function returned matches Player 1 ("☀️"), return this and turn the game off.
    if (calculateWinner(squares) === "☀️") {
      setGameOn(false);
      setPlayerStatus("Player 1 wins!");
      // If the game is running and the value our winning function returned matches Player 2 "🌧", return this and turn the game off.
    } else if (calculateWinner(squares) === "🌧") {
      setGameOn(false);
      setPlayerStatus("Player 2 wins!");
    } else if (calculateTie(squares) === true) {
      setGameOn(false);
      setPlayerStatus("It's a tie!");
    }
  }

  //////////---------- ONCLICK GAMEPLAY ----------//////////
  const handleGamePlay = (index) => {
    let updateBoard = [...squares];

    if (squares[index] === null) {
      updateBoard[index] = player;
      setSquares(updateBoard);
      setPlayer(player === "☀️" ? "🌧" : "☀️");
      setPlayerStatus(
        player === "☀️" ? "P2, it's your turn." : "P1, it's your turn."
      );
    }
  };

  return (
    <>
      <div className="main_container">
        <h1 className="primary_header">Tic-Tac-Toe</h1>
        <div className="player_status">{playerStatus}</div>
        <div className="bg_wrap">
          <div className="game_container">
            {squares.map((squares, index) => {
              return (
                <Square
                  gameOn={gameOn}
                  squares={squares}
                  handleGamePlay={handleGamePlay}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <a href="#" className="btn" onClick={handleReset}>
          Start Over?
        </a>
        <footer>
          <p className="footer_text">&copy; Ariana Brashear, 2022</p>
        </footer>
      </div>
    </>
  );
};

export default App;
