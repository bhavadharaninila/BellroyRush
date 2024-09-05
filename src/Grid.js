import React from 'react';
import './Grid.css';

const Grid = ({ children }) => {
  return (
    <div className="grid">
      {Array.from({ length: 5 }).map((_, row) => (
        <div className="row" key={row}>
          {Array.from({ length: 5 }).map((_, col) => (
            <div className="cell" key={col}>
              {children({ row, col })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
