import React from "react";

const Square = ({ squares, handleGamePlay, index, gameOn }) => {
  const handleClick = () => {
    // This will only pass an index to our function if the game is on. The game is set to on by default, so it'll run on the page loading.
    if (gameOn) {
      handleGamePlay(index);
      // If the game is NOT on and the user tries to click another square, it will alert them that they need to reset the board to keep playing.
    } else if (!gameOn) {
      alert('Please click "start over" to try again.');
    } else {
      alert(
        "Whoops! Looks like something went wrong. Please refresh the page and try again."
      );
    }
  };

  return (
    <div className="square" onClick={handleClick}>
      {squares}
    </div>
  );
};

export default Square;
