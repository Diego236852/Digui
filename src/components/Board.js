import React from 'react';


const styles = {
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    width: '100%',
    height: '500px',
    overflow: 'scroll',  // Desplazamiento habilitado
    border: '10px solid #8E44AD',  // Borde púrpura del tablero
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  board: {
    backgroundColor: '#00796B',
    borderRadius: '20px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'visible',
  },
  tile: {
    position: 'absolute',
    margin: '5px',
    padding: '10px 25px',
    backgroundColor: '#F9E79F',
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '90px',
    minHeight: '45px',
    transition: 'transform 0.3s ease',
  },
  // Media query para pantallas portrait
  '@media (orientation: portrait)': {
    boardContainer: {
      height: '100vh',  // Ajusta la altura a la pantalla completa
      overflow: 'hidden',  // Evita el desplazamiento
    },
    board: {
      width: '100%',
      height: '80vh',  // Hacer que el tablero ocupe un 80% de la altura
    },
    tile: {
      minWidth: '60px',  // Fichas más pequeñas en pantallas portrait
      minHeight: '30px',
      fontSize: '16px',
    },
  },
};


// Funciones para calcular la posición en el tablero
const getTopPosition = (index) => {
  const rowSpacing = 100; // Ajusta el espaciado entre filas
  const offsetTop = 60;  // Mueve las fichas hacia la parte superior del tablero
  return offsetTop + Math.floor(index / 3) * rowSpacing; // Ajustado para empezar desde la esquina superior
};

const getLeftPosition = (index) => {
  const columnSpacing = 150; // Ajusta el espaciado entre columnas
  const offsetLeft = 20;  // Mueve las fichas hacia el borde izquierdo del tablero
  return offsetLeft + (index % 3) * columnSpacing; // Ajustado para empezar desde la esquina izquierda
};

// Función para determinar el ángulo de rotación basado en la posición de la ficha en el tablero
const getRotation = (index) => {
  if (index % 2 === 0) return 0;  // Fichas horizontales
  return 90;  // Fichas verticales
};


const Board = ({ board }) => {
  const boardWidth = 2000;  // Ancho del tablero grande para desplazamiento
  const boardHeight = 1200; // Altura del tablero grande para desplazamiento

  return (
    <div style={styles.boardContainer}>
      <div style={{ ...styles.board, width: `${boardWidth}px`, height: `${boardHeight}px` }}>
        {board.map((tile, index) => (
          <div
            key={index}
            style={{
              ...styles.tile,
              top: `${getTopPosition(index)}px`,  // Ajustado para mover hacia arriba
              left: `${getLeftPosition(index)}px`,  // Ajustado para mover hacia la izquierda
              transform: `rotate(${getRotation(index)}deg)`, // Rotación dinámica
            }}
          >
            <span>{tile.left}</span> | <span>{tile.right}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Board;