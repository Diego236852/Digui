import React from 'react';
import styled from 'styled-components';

const ABCloser = ({ onRetry }) => {
  return (
    <GameOverContainer>
      <GameOverTitle>Game Over</GameOverTitle>
      <GameOverText>¡Se acabó el tiempo! Intenta de nuevo.</GameOverText>
      <RetryButton onClick={onRetry}>Intentar de nuevo</RetryButton>
    </GameOverContainer>
  );
};

export default ABCloser;

// Componentes estilizados
const GameOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffe5e5; /* Fondo de color suave */
  text-align: center;
  padding: 20px;
`;

const GameOverTitle = styled.h1`
  font-size: 48px;
  color: #ff4d4d;
  margin-bottom: 20px;
`;

const GameOverText = styled.p`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const RetryButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a189a;
  }
`;
