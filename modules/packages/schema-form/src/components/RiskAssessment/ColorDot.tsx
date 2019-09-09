import React from 'react';

export default function ColorDot() {
  const colors = ['#ffadd2', '#ffbf00', '#9c27b0', '#f44336', '#2196f3', '#673ab7', '#ff9800'];
  const index = Math.floor(Math.random() * colors.length);
  const color = colors[index];
  return (
    <span
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        margin: '0 10px 1px',
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
  );
}
