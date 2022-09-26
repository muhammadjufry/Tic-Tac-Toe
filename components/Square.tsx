import React from 'react';

type Props = {
  value: number;
  onClick: () => void;
};

export default function Square({ value, onClick }: Props) {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
}
