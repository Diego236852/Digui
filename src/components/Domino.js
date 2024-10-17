import React, { useState, useEffect } from "react";
import DominoTile from "./DominoTile";
import DominoWinnerPage from "./DominoWinnerPage";
import AreYouSure from "./AreYouSure";
import imageDatabase from "./DominoImageDatabase"; // Importamos la base de datos de imágenes
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

// GlobalStyle para resetear márgenes, importar fuentes y mejorar el diseño
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Quicksand', sans-serif;
    background-color: #f7f7f7;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 6px rgba(255, 0, 0, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 12px rgba(255, 0, 0, 1); }
  100% { transform: scale(1); box-shadow: 0 0 6px rgba(255, 0, 0, 0.5); }
`;

const DecorativeSide = styled.div`
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const LeftDecorativeSide = styled(DecorativeSide)`
  left: 0;
  background-color: #d292bc;
  border-radius: 0 15px 15px 0;
`;

const RightDecorativeSide = styled(DecorativeSide)`
  right: 0;
  background-color: #d292bc;
  border-radius: 15px 0 0 15px;
`;

const Shape = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color || "#f9d423"};
  animation: ${float} 3s ease-in-out infinite;
  margin: 10px 0;
`;

const Circle = styled(Shape)`
  border-radius: 50%;
`;

const Square = styled(Shape)`
  border-radius: 8%;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid ${(props) => props.color || "#f9d423"};
  animation: ${float} 3s ease-in-out infinite;
  margin: 10px 0;
`;

const Timer = styled.div`
  font-size: 14px;
  font-weight: bold;
  ${({ isBlinking }) =>
    isBlinking &&
    css`
      animation: ${pulse} 1s infinite;
      color: red;
    `}
`;

const HighlightedSide = styled.div`
  border: 2px solid #ff6f61;
  border-radius: 6px;
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ active }) => (active ? "#fff" : "#6b21a8")};
  text-align: center;
`;

function Domino({ onExitToMenu }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const shuffleTiles = (tiles) => {
    const shuffled = tiles.sort(() => Math.random() - 0.5);
    return {
      player1Tiles: shuffled.slice(0, 7),
      player2Tiles: shuffled.slice(7, 14),
      remainingTiles: shuffled.slice(14),
    };
  };

  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [tiles, setTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBlinking, setIsBlinking] = useState(false);

  const initializeGame = () => {
    const { player1Tiles, player2Tiles, remainingTiles } = shuffleTiles([...imageDatabase]);
    setPlayer1(player1Tiles);
    setPlayer2(player2Tiles);
    setBoard([]);
    setCurrentPlayer(1);
    setTiles(remainingTiles);
    setGameOver(false);
    setWinner(null);
    setTimeLeft(60);
    setIsBlinking(false);
  };

  useEffect(() => {
    initializeGame();
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      if (timeLeft <= 15) {
        setIsBlinking(true);
      }
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      determineWinner();
    }
  }, [timeLeft, gameOver]);

  const determineWinner = () => {
    const player1Fichas = player1.length;
    const player2Fichas = player2.length;

    if (player1Fichas < player2Fichas) {
      setWinner(1);
    } else if (player2Fichas < player1Fichas) {
      setWinner(2);
    } else {
      setWinner("empate");
    }
    setGameOver(true);
  };

  const validMove = (tile) => {
    if (board.length === 0) return true;

    const leftEnd = board[0];
    const rightEnd = board[board.length - 1];

    return (
      tile.leftNumber === leftEnd.leftNumber ||
      tile.rightNumber === leftEnd.leftNumber ||
      tile.leftShape === leftEnd.leftShape ||
      tile.rightShape === leftEnd.leftShape ||
      tile.leftColor === leftEnd.leftColor ||
      tile.rightColor === leftEnd.leftColor ||
      tile.leftNumber === rightEnd.rightNumber ||
      tile.rightNumber === rightEnd.rightNumber ||
      tile.leftShape === rightEnd.rightShape ||
      tile.rightShape === rightEnd.rightShape ||
      tile.leftColor === rightEnd.rightColor ||
      tile.rightColor === rightEnd.rightColor
    );
  };

  const addTileToBoard = (tile) => {
    const leftEnd = board.length > 0 ? board[0] : null;
    const rightEnd = board.length > 0 ? board[board.length - 1] : null;

    if (board.length === 0) {
      setBoard([tile]);
    } else {
      if (
        tile.leftNumber === leftEnd.leftNumber ||
        tile.leftShape === leftEnd.leftShape ||
        tile.leftColor === leftEnd.leftColor ||
        tile.rightNumber === leftEnd.leftNumber ||
        tile.rightShape === leftEnd.leftShape ||
        tile.rightColor === leftEnd.leftColor
      ) {
        setBoard([tile, ...board]);
      } else if (
        tile.leftNumber === rightEnd.rightNumber ||
        tile.leftShape === rightEnd.rightShape ||
        tile.leftColor === rightEnd.rightColor ||
        tile.rightNumber === rightEnd.rightNumber ||
        tile.rightShape === rightEnd.rightShape ||
        tile.rightColor === rightEnd.rightColor
      ) {
        setBoard([...board, tile]);
      }
    }

    if (currentPlayer === 1) {
      const newPlayer1 = player1.filter((t) => t !== tile);
      setPlayer1(newPlayer1);
      if (newPlayer1.length === 0) {
        setGameOver(true);
        setWinner(1);
        return;
      }
    } else {
      const newPlayer2 = player2.filter((t) => t !== tile);
      setPlayer2(newPlayer2);
      if (newPlayer2.length === 0) {
        setGameOver(true);
        setWinner(2);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const drawTile = () => {
    if (tiles.length === 0) return null;

    const newTile = tiles[0];
    const remainingTiles = tiles.slice(1);

    if (currentPlayer === 1) {
      setPlayer1([...player1, newTile]);
    } else {
      setPlayer2([...player2, newTile]);
    }

    setTiles(remainingTiles);
    return newTile;
  };

  const handleTurn = () => {
    const playerTiles = currentPlayer === 1 ? player1 : player2;
    const hasValidMove = playerTiles.some(validMove);

    if (!hasValidMove) {
      const newTile = drawTile();
      if (!newTile || !validMove(newTile)) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  };

  const renderPlayerTiles = (playerTiles, playerNumber) => {
    return playerTiles.map((tile, index) => (
      <DominoTile
        key={index}
        tile={tile}
        onClick={() => currentPlayer === playerNumber && validMove(tile) && addTileToBoard(tile)}
        flipped={currentPlayer !== playerNumber}
      />
    ));
  };

  const renderBoard = () => {
    return board.map((tile, index) => {
      const isLeftEnd = index === 0;
      const isRightEnd = index === board.length - 1;

      return (
        <div key={index}>
          {isLeftEnd && <HighlightedSide>{tile.leftNumber}</HighlightedSide>}
          <DominoTile tile={tile} leftEnd={isLeftEnd} rightEnd={isRightEnd} />
          {isRightEnd && <HighlightedSide>{tile.rightNumber}</HighlightedSide>}
        </div>
      );
    });
  };

  const handleExitClick = () => setShowConfirmation(true);
  const handleCancelExit = () => setShowConfirmation(false);
  const handleConfirmExit = () => {
    setShowConfirmation(false);
    onExitToMenu();
  };

  return (
    <>
      <GlobalStyle />
      {isPortrait ? (
        <RotateScreenMessage>Por favor, gira tu dispositivo para jugar</RotateScreenMessage>
      ) : (
        <>
          <LeftDecorativeSide>
            <Circle color="#FF6F61" />
            <Square color="#A2D984" />
            <Triangle color="#FDFD96" />
          </LeftDecorativeSide>

          <RightDecorativeSide>
            <Square color="#A783D9" />
            <Triangle color="#87CEEB" />
            <Circle color="#F4C2C2" />
          </RightDecorativeSide>

          <Container>
            <Header>
              <ExitButton onClick={handleExitClick}>←</ExitButton>
              <Timer isBlinking={isBlinking}>
                Tiempo restante: {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`}
              </Timer>
            </Header>

            {gameOver ? (
              <DominoWinnerPage winner={winner} onPlayAgain={initializeGame} onExitToMenu={onExitToMenu} />
            ) : (
              <>
                <StyledBoard>{renderBoard()}</StyledBoard>
                <StyledButton onClick={handleTurn}>Robar ficha / Pasar turno</StyledButton>
                <PlayerArea>
                  <PlayerRow active={currentPlayer === 1}>
                    <Title>Jugador 1 {currentPlayer === 1 ? "" : "(Esperando...)"}</Title>
                    <PlayerTiles>{renderPlayerTiles(player1, 1)}</PlayerTiles>
                  </PlayerRow>
                  <PlayerRow active={currentPlayer === 2}>
                    <Title>Jugador 2 {currentPlayer === 2 ? "" : "(Esperando...)"}</Title>
                    <PlayerTiles>{renderPlayerTiles(player2, 2)}</PlayerTiles>
                  </PlayerRow>
                </PlayerArea>
              </>
            )}

            {showConfirmation && <AreYouSure onConfirm={handleConfirmExit} onCancel={handleCancelExit} />}
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4f8;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #6b21a8;
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  font-family: 'Baloo 2', cursive;
`;

const ExitButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff6f61;
  }
`;

const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #36276b;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  flex-grow: 1;
  max-height: 40%;
  margin: 15px 0;
`;

const PlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PlayerRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  background-color: ${({ active }) => (active ? "#6b21a8" : "#dce6f2")};
  color: ${({ active }) => (active ? "white" : "#6b21a8")};
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
`;

const PlayerTiles = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: white;
  background-color: #d292bc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6b21a8;
  }

  margin-bottom: 10px;
`;

const RotateScreenMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: #6b21a8;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

export default Domino;
