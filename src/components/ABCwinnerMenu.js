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

const ABCwinnerMenu = ({ score, onRestart, onExitToMenu }) => {
  return (
    <WinnerContainer>
      <Title>¡Ganaste!</Title>
      <Score>Tu puntuación: {score} puntos</Score>
      <Button onClick={onRestart}>Jugar de nuevo</Button>
      {/* Nuevo botón para salir al menú */}
      <Button onClick={onExitToMenu}>Salir al menú</Button>
    </WinnerContainer>
  );
};

export default ABCwinnerMenu;
