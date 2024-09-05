import React from 'react';
import './Robot.css';

const Robot = ({ direction }) => {
  const getRotation = () => {
    switch (direction) {
      case 'DOWN':
        return 'rotate(0deg)';
      case 'LEFT':
        return 'rotate(90deg)';
      case 'UP':
        return 'rotate(180deg)';
      case 'RIGHT':
        return 'rotate(270deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <div className="robot" style={{ transform: getRotation() }}>
      🦉
    </div>
  );
};

export default Robot;
