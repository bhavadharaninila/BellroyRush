import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import Robot from './Robot';
import './App.css';

const initialPosition = { row: 0, col: 0 };
const directions = {
  UP: { dx: 0, dy: -1 },
  RIGHT: { dx: 1, dy: 0 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 }
};

const getRandomPosition = () => ({
  row: Math.floor(Math.random() * 5),
  col: Math.floor(Math.random() * 5)
});

const App = () => {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState('DOWN');
  const [iconPosition, setIconPosition] = useState(null);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const move = (newDirection) => {
    if (!gameStarted) return; 
    setDirection(newDirection);
    setPosition((prev) => {
      const { dx, dy } = directions[newDirection];
      const newRow = prev.row + dy;
      const newCol = prev.col + dx;
      if (newRow >= 0 && newRow <= 4 && newCol >= 0 && newCol <= 4) {
        return { row: newRow, col: newCol };
      }
      return prev;
    });
  };

  useEffect(() => {
    if (position.row === iconPosition?.row && position.col === iconPosition?.col) {
      setMessage('Yesss!');
      setTimeout(() => {
        setMessage('');
        setIconPosition(getRandomPosition());
      }, 1000);
    }
  }, [position, iconPosition]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setIconPosition(getRandomPosition());
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
    setIconPosition(getRandomPosition()); 
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Welcome to Belloy Rush</h1>
          <button onClick={handleStart}>Start</button>
        </div>
      ) : (
        <>
          <h1>Belloy Rush</h1>
          <Grid>
            {({ row, col }) => {
              if (row === position.row && col === position.col) {
                return <Robot direction={direction} />;
              } else if (row === iconPosition?.row && col === iconPosition?.col) {
                return <div className="icon">🎒</div>;
              }
              return null;
            }}
          </Grid>
          <div className="controls">
          <button className="control-btn up" onClick={() => move('UP')}>Up</button>
            <button className="control-btn down" onClick={() => move('DOWN')}>Down</button>
            <button className="control-btn left" onClick={() => move('LEFT')}>Left</button>
            <button className="control-btn right" onClick={() => move('RIGHT')}>Right</button>
          </div>
          {message && (
            <div className={`message ${message ? 'show-message' : ''}`}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;