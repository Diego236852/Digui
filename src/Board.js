// Board.js
import React from 'react';

const Board = ({ board }) => {
  return (
    <div style={styles.boardContainer}>
      {board.length === 0 ? (
        <p style={styles.emptyBoardText}>El tablero está vacío</p>
      ) : (
        board.map((tile, index) => (
          <div key={index} style={styles.tile}>
            <span style={styles.tileText}>{tile.left} | {tile.right}</span>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  boardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    border: '3px solid #ccc',
    width: '80%',
    margin: '20px auto',
  },
  emptyBoardText: {
    fontSize: '20px',
    color: '#888',
    fontStyle: 'italic',
  },
  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '50px',
    margin: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #000',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
  },
  tileText: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
};

export default Board;
