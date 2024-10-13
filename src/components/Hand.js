import React from 'react';

const Hand = ({ tiles, onPlaceTile }) => {
  return (
    <div style={styles.hand}>
      {tiles.map((tile, index) => (
        <button key={index} style={styles.tile} onClick={() => onPlaceTile(tile)}>
          <span>{tile.left}</span>
          <span>{tile.right}</span>
        </button>
      ))}
    </div>
  );
};

const styles = {
    hand: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    tile: {
      margin: '10px',
      padding: '20px',
      backgroundColor: '#F0E68C',
      borderRadius: '5px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '60px',
      minHeight: '100px',
    },
    // Media query para pantallas portrait
    '@media (orientation: portrait)': {
      tile: {
        minWidth: '45px',
        minHeight: '80px',
        fontSize: '18px',
      },
    },
  };
  

export default Hand;
