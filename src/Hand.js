// Hand.js
import React from 'react';

const Hand = ({ tiles, onPlaceTile }) => {
  return (
    <div style={styles.handContainer}>
      {tiles.map((tile, index) => (
        <button key={index} onClick={() => onPlaceTile(tile)} style={styles.tile}>
          <span style={styles.tileText}>{tile.left} | {tile.right}</span>
        </button>
      ))}
    </div>
  );
};

const styles = {
  handContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  tile: {
    width: '80px',
    height: '40px',
    margin: '5px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    cursor: 'pointer',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
  tileText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default Hand;
