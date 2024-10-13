import React, { useState, useEffect } from 'react';
import Board from './Board';
import Hand from './Hand';

const dominoTiles = [
  { left: 6, right: 6 }, { left: 6, right: 5 }, { left: 6, right: 4 }, { left: 6, right: 3 }, { left: 6, right: 2 },
  { left: 5, right: 5 }, { left: 5, right: 4 }, { left: 5, right: 3 }, { left: 5, right: 2 }, { left: 5, right: 1 },
  { left: 4, right: 4 }, { left: 4, right: 3 }, { left: 4, right: 2 }, { left: 4, right: 1 }, { left: 4, right: 0 },
  { left: 3, right: 3 }, { left: 3, right: 2 }, { left: 3, right: 1 }, { left: 3, right: 0 },
  { left: 2, right: 2 }, { left: 2, right: 1 }, { left: 2, right: 0 },
  { left: 1, right: 1 }, { left: 1, right: 0 },
  { left: 0, right: 0 },
];

const shuffleTiles = (tiles) => tiles.sort(() => Math.random() - 0.5);

const App = () => {
  const [handPlayer1, setHandPlayer1] = useState([]);
  const [handPlayer2, setHandPlayer2] = useState([]);
  const [board, setBoard] = useState([]);
  const [remainingTiles, setRemainingTiles] = useState([]); // Fichas restantes en el monte
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const shuffledTiles = shuffleTiles(dominoTiles);
    setHandPlayer1(shuffledTiles.slice(0, 7));  // 7 fichas para el jugador 1
    setHandPlayer2(shuffledTiles.slice(7, 14)); // 7 fichas para el jugador 2
    setRemainingTiles(shuffledTiles.slice(14)); // Resto de fichas en el monte
  }, []);

  const rotateTile = (tile) => {
    return { left: tile.right, right: tile.left };
  };

  const placeTile = (tile, playerHand, setPlayerHand) => {
    if (board.length === 0) {
      setBoard([...board, tile]);
    } else {
      const firstTile = board[0];
      const lastTile = board[board.length - 1];

      const canPlaceLeft = tile.left === firstTile.left || tile.right === firstTile.left;
      const canPlaceRight = tile.left === lastTile.right || tile.right === lastTile.right;

      if (canPlaceLeft) {
        if (tile.right === firstTile.left) {
          setBoard([tile, ...board]);
        } else {
          setBoard([rotateTile(tile), ...board]);
        }
        setPlayerHand(playerHand.filter(t => t !== tile));
        checkWinner(playerHand); // Verifica si alguien ganó
      } else if (canPlaceRight) {
        if (tile.left === lastTile.right) {
          setBoard([...board, tile]);
        } else {
          setBoard([...board, rotateTile(tile)]);
        }
        setPlayerHand(playerHand.filter(t => t !== tile));
        checkWinner(playerHand); // Verifica si alguien ganó
      } else {
        alert('La ficha no coincide con los extremos del tablero.');
      }
    }
  };

  // Verifica si el jugador ganó
  const checkWinner = (playerHand) => {
    if (playerHand.length === 1) { // Cuando el jugador coloca la última ficha, se queda sin fichas
      setWinner(currentPlayer); // Declara al jugador actual como ganador
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Cambia de turno si no hay ganador
    }
  };

  // Función para que el jugador pida una ficha del monte
  const drawTile = (playerHand, setPlayerHand) => {
    if (remainingTiles.length === 0) {
      alert('No hay más fichas disponibles en el monte.');
    } else {
      const newTile = remainingTiles[0]; // La primera ficha del monte
      setPlayerHand([...playerHand, newTile]); // Añade la nueva ficha a la mano del jugador
      setRemainingTiles(remainingTiles.slice(1)); // Elimina la ficha del monte
    }
  };

  // Función para pasar turno
  const passTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Cambia de turno
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    const shuffledTiles = shuffleTiles(dominoTiles);
    setHandPlayer1(shuffledTiles.slice(0, 7));  // 7 fichas para el jugador 1
    setHandPlayer2(shuffledTiles.slice(7, 14)); // 7 fichas para el jugador 2
    setRemainingTiles(shuffledTiles.slice(14)); // Resto de fichas en el monte
    setBoard([]);
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.title}>Juego de Dominó</h1>
      <Board board={board} />

      {winner && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.winnerText}>¡El jugador {winner} ha ganado!</h2>
            <button style={styles.button} onClick={resetGame}>Jugar de nuevo</button>
          </div>
        </div>
      )}
      
      {!winner && (
        <div style={styles.handContainer}>
          <h2 style={styles.turnTitle(currentPlayer === 1)}>Jugador 1: Tu turno</h2>
          {currentPlayer === 1 ? (
            <>
              <Hand tiles={handPlayer1} onPlaceTile={(tile) => placeTile(tile, handPlayer1, setHandPlayer1)} />
              <div style={styles.buttonsContainer}>
                <button style={styles.button} onClick={() => drawTile(handPlayer1, setHandPlayer1)}>Pedir ficha</button>
                <button style={styles.button} onClick={passTurn}>Pasar turno</button>
              </div>
            </>
          ) : (
            <>
              <Hand tiles={handPlayer2} onPlaceTile={(tile) => placeTile(tile, handPlayer2, setHandPlayer2)} />
              <div style={styles.buttonsContainer}>
                <button style={styles.button} onClick={() => drawTile(handPlayer2, setHandPlayer2)}>Pedir ficha</button>
                <button style={styles.button} onClick={passTurn}>Pasar turno</button>
              </div>
            </>
          )}
          <h2 style={styles.turnTitle(currentPlayer === 2)}>Jugador 2: Tu turno</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    position: 'relative',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  handContainer: {
    marginTop: '20px',
  },
  turnTitle: (isActive) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: isActive ? '#4CAF50' : '#888',
    textShadow: isActive ? '0 0 10px rgba(0, 200, 0, 0.5)' : 'none',
  }),
  buttonsContainer: {
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalContent: {
    textAlign: 'center',
  },
  winnerText: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '20px',
  },
};

export default App;
