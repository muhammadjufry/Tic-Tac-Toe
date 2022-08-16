import React, { useEffect, useState } from 'react';
import { Square } from './components/Square/Square';
const App = () => {
  let isGameOver = false;
  let statusPlayer;
  let gameStatus;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [startGame, setStartGame] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [computerPlay, setComputerPlay] = useState(false);
  const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(9);
  const winner = calculateWinner(squares);
  winner
    ? (statusPlayer = winner)
    : (statusPlayer = 'Player Turn: ' + (xTurn ? 'X' : 'O'));

  const gamePlay = (bool) => {
    if (bool) {
      setComputerPlay(true);
      setStartGame(true);
    } else if (!bool) {
      setComputerPlay(false);
      setStartGame(true);
    }
  };

  const handleClick = (i) => {
    if (isGameOver || squares[i] !== null) return;
    let squaresCopy = [...squares];
    squaresCopy[i] = xTurn ? 'X' : !computerPlay && 'O';
    const newNumberOfTurnsLeft = numberOfTurnsLeft - 1;
    setNumberOfTurnsLeft(
      computerPlay ? xTurn && newNumberOfTurnsLeft : newNumberOfTurnsLeft
    );
    setXTurn(computerPlay ? false : !xTurn);
    setSquares(squaresCopy);
  };

  const playWithComputer = () => {
    if (!computerPlay || isGameOver || xTurn || numberOfTurnsLeft === 0) return;
    let squaresCopy = [...squares];
    let numberOfTurnsLeftCopy = numberOfTurnsLeft - 1;
    const randomIndex = Math.ceil(Math.random() * 9);
    if (squares[randomIndex] === null) {
      squaresCopy[randomIndex] = 'O';
      setSquares(squaresCopy);
      setXTurn(true);
      setNumberOfTurnsLeft(numberOfTurnsLeftCopy);
    } else {
      playWithComputer();
    }
  };

  useEffect(playWithComputer);

  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        isGameOver = true;
        gameStatus = 'Game Over!';
        return `The winner is: ${squares[a]}`;
      }
    }

    if (numberOfTurnsLeft === 0) {
      isGameOver = true;
      gameStatus = 'Game Over!';
      return 'Tie';
    }

    return null;
  }

  const restartGame = () => {
    setStartGame(false);
    setSquares(Array(9).fill(null));
    setNumberOfTurnsLeft(9);
    setXTurn(true);
    isGameOver = false;
    gameStatus = 'Player Turn: X';
  };

  return (
    <div className="App">
      {!startGame ? (
        <div className="startGame">
          <h1>Tic tac toe game</h1>
          <div className="startGameOptions">
            <button className="playButton" onClick={() => gamePlay(false)}>
              Play with Friends
            </button>
            <button className="playButton" onClick={() => gamePlay(true)}>
              Play with Computer
            </button>
          </div>
        </div>
      ) : (
        <div className="game">
          <h3>{statusPlayer}</h3>
          <div className="board">
            {squares.map((square, index) => (
              <Square
                value={square}
                onClick={() => handleClick(index)}
                key={index}
              />
            ))}
          </div>
          <h4 className="gameStatus">{gameStatus}</h4>
          {isGameOver && (
            <button className="restartGame" onClick={() => restartGame()}>
              Restart Game
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
