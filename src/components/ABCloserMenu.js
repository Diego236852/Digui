import React from 'react';
import styled, { keyframes } from 'styled-components';


// Animación de entrada de los elementos
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animación de pulso para el botón
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Fondo colorido con gradiente para atraer a los niños
const GameOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
  text-align: center;
  padding: 0;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out forwards;
  box-sizing: border-box;
`;

// Título animado con la fuente "Baloo"
const GameOverTitle = styled.h1`
  font-family: 'Baloo 2', cursive;
  font-size: 64px;
  color: #ff4081;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

// Texto explicativo con la fuente "Poppins Bold"
const GameOverText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.2s;
`;

// Botón de reinicio con animación pulsante y la fuente "Quicksand"
const RetryButton = styled.button`
  font-family: 'Quicksand', sans-serif;
  background-color: #6b21a8;
  color: white;
  padding: 20px 40px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:hover {
    background-color: #5a189a;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Forma geométrica flotante (agrega un toque divertido)
const FloatingShape = styled.div`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: ${fadeIn} ${(props) => props.duration}s ease-in-out infinite alternate;
  opacity: 0.4;
`;


const ABCloserMenu = ({ onRetry }) => {
  const handleRetry = () => {
    onRetry();
  };

  return (
    <GameOverContainer>
      <FloatingShape size="150px" color="#ff6b6b" top="10%" left="20%" duration={4} />
      <FloatingShape size="120px" color="#ffb86c" top="80%" left="10%" duration={5} />
      <FloatingShape size="100px" color="#ff9f43" top="40%" left="70%" duration={6} />
      <FloatingShape size="180px" color="#ff6b81" top="30%" left="80%" duration={3} />

      <GameOverTitle>Game Over</GameOverTitle>
      <GameOverText>¡Se acabó el tiempo! Intenta de nuevo.</GameOverText>
      <RetryButton onClick={handleRetry}>Intentar de nuevo</RetryButton>
    </GameOverContainer>
  );
};


export default ABCloserMenu;
