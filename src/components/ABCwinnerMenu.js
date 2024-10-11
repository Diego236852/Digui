import React from 'react';
import styled from 'styled-components';

const WinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3e5f5;
`;

const Title = styled.h2`
  font-family: 'Baloo 2', cursive;
  font-size: 40px;
  color: #6b21a8;
  margin-bottom: 20px;
`;

const Score = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5a189a;
  }
`;

const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  animation: fall 3s ease-in-out infinite;

  @keyframes fall {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

const ABCwinnerMenu = ({ score, onRestart, onExitToMenu }) => {
  const confettiColors = ['#ff5252', '#ffb74d', '#4caf50', '#40c4ff', '#ab47bc']; // Colores para el confeti

  return (
    <WinnerContainer>
      <Title>¡Ganaste!</Title>
      <Score>Tu puntuación: {score} puntos</Score>
      <Button onClick={onRestart}>Jugar de nuevo</Button>
      <Button onClick={onExitToMenu}>Salir al menú</Button>

      {/* Confetti */}
      <ConfettiContainer show={true}>
        {Array.from({ length: 100 }).map((_, i) => (
          <Confetti
            key={i}
            x={Math.random() * 100}
            y={Math.random() * 100}
            color={confettiColors[Math.floor(Math.random() * confettiColors.length)]}
          />
        ))}
      </ConfettiContainer>
    </WinnerContainer>
  );
};

export default ABCwinnerMenu;
