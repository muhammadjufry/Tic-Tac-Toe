import React from 'react';
import './square.css';

export const Square = ({ value, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
};
