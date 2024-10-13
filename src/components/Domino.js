import React, { useState, useEffect } from 'react';
import Board from './Board';
import Hand from './Hand';
import AreYouSureMenu from './AreYouSure'; // Importa el menú de confirmación

const dominoTiles = [
  { left: '💜', right: '💚' }, { left: '💙', right: '💛' }, { left: '❤️', right: '💙' }, 
  { left: '💜', right: '💙' }, { left: '💚', right: '💛' }, { left: '❤️', right: '💚' },
  { left: '💙', right: '💛' }, { left: '💚', right: '💛' }, { left: '💜', right: '❤️' },
  { left: '💛', right: '❤️' }, { left: '💙', right: '💚' }, { left: '💜', right: '❤️' }
];

const shuffleTiles = (tiles) => tiles.sort(() => Math.random() - 0.5);

const Domino = ({ onExitToMenu }) => {
  const [handPlayer1, setHandPlayer1] = useState([]);
  const [handPlayer2, setHandPlayer2] = useState([]);
  const [board, setBoard] = useState([]);
  const [remainingTiles, setRemainingTiles] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false); // Estado para mostrar el menú de confirmación

  useEffect(() => {
    const shuffledTiles = shuffleTiles(dominoTiles);
    const initialTile = shuffledTiles[0];
    setBoard([initialTile]);
    setHandPlayer1(shuffledTiles.slice(1, 8));
    setHandPlayer2(shuffledTiles.slice(8, 15));
    setRemainingTiles(shuffledTiles.slice(15));
  }, []);

  const rotateTile = (tile) => {
    return { left: tile.right, right: tile.left };
  };

  const placeTile = (tile, playerHand, setPlayerHand) => {
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
      checkWinner(playerHand);
    } else if (canPlaceRight) {
      if (tile.left === lastTile.right) {
        setBoard([...board, tile]);
      } else {
        setBoard([...board, rotateTile(tile)]);
      }
      setPlayerHand(playerHand.filter(t => t !== tile));
      checkWinner(playerHand);
    } else {
      alert('La ficha no coincide con los extremos del tablero.');
    }
  };

  const checkWinner = (playerHand) => {
    if (playerHand.length === 0) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const drawTile = (playerHand, setPlayerHand) => {
    if (remainingTiles.length === 0) {
      alert('No hay más fichas disponibles en el monte.');
    } else {
      const newTile = remainingTiles[0];
      setPlayerHand([...playerHand, newTile]);
      setRemainingTiles(remainingTiles.slice(1));
    }
  };

  const passTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    const shuffledTiles = shuffleTiles(dominoTiles);
    const initialTile = shuffledTiles[0];
    setBoard([initialTile]);
    setHandPlayer1(shuffledTiles.slice(1, 8));
    setHandPlayer2(shuffledTiles.slice(8, 15));
    setRemainingTiles(shuffledTiles.slice(15));
    setCurrentPlayer(1);
    setWinner(null);
  };

  const handleExit = () => {
    setShowExitConfirmation(true);
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleConfirmExit = () => {
    setShowExitConfirmation(false);
    onExitToMenu();
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.title}>Juego de Dominó</h1>
      <Board board={board} />

      {winner && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.winnerText}>¡El jugador {winner} ha ganado!</h2>
            <button style={styles.button} onClick={resetGame}>🎉 Jugar de nuevo 🎉</button>
          </div>
        </div>
      )}
      
      {!winner && (
        <div style={styles.handContainer}>
          <h2 style={styles.turnTitle(currentPlayer === 1)}>🎮 Jugador 1: ¡Es tu turno! 🎮</h2>
          {currentPlayer === 1 ? (
            <>
              <Hand tiles={handPlayer1} onPlaceTile={(tile) => placeTile(tile, handPlayer1, setHandPlayer1)} />
              <div style={styles.buttonsContainer}>
                <button style={styles.button} onClick={() => drawTile(handPlayer1, setHandPlayer1)}>🃏 Pedir ficha</button>
                <button style={styles.button} onClick={passTurn}>➡️ Pasar turno</button>
              </div>
            </>
          ) : (
            <>
              <Hand tiles={handPlayer2} onPlaceTile={(tile) => placeTile(tile, handPlayer2, setHandPlayer2)} />
              <div style={styles.buttonsContainer}>
                <button style={styles.button} onClick={() => drawTile(handPlayer2, setHandPlayer2)}>🃏 Pedir ficha</button>
                <button style={styles.button} onClick={passTurn}>➡️ Pasar turno</button>
              </div>
            </>
          )}
          <h2 style={styles.turnTitle(currentPlayer === 2)}>🎮 Jugador 2: ¡Es tu turno! 🎮</h2>
        </div>
      )}

      <button style={styles.exitButton} onClick={handleExit}>Salir</button>

      {showExitConfirmation && <AreYouSureMenu onConfirm={handleConfirmExit} onCancel={handleCancelExit} />}
    </div>
  );
};

const styles = {
    appContainer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#ffedc8',
      minHeight: '100vh',
      position: 'relative',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      backgroundImage: 'url("/path-to-texture-image.jpg")',
      backgroundSize: 'cover',
    },
    title: {
      fontSize: '40px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#2C3E50',
    },
    handContainer: {
      marginTop: '20px',
    },
    turnTitle: (isActive) => ({
      fontSize: '30px',
      fontWeight: 'bold',
      color: isActive ? '#16a085' : '#888',
      textShadow: isActive ? '0 0 10px rgba(22, 160, 133, 0.7)' : 'none',
    }),
    buttonsContainer: {
      marginTop: '10px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '18px',
      margin: '10px',
      backgroundColor: '#FFA500',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
    },
    exitButton: {
      padding: '10px 20px',
      fontSize: '18px',
      backgroundColor: '#FF6347',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginTop: '20px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
    },
    // Media query para pantallas portrait
    '@media (orientation: portrait)': {
      appContainer: {
        padding: '10px',
      },
      title: {
        fontSize: '32px',
      },
      button: {
        padding: '12px 20px',
        fontSize: '16px',
      },
    },
  };
  

export default Domino;
