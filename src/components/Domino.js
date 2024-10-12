import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import BottomNavBar from './BottomNavBar';

// Contenedor principal del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #f3e5f5;
  position: relative;
  overflow: hidden;
`;

// Contenedor del contenido del juego
const GameContent = styled.div`
  flex: 1;
  padding: 80px 20px 90px; /* Espacio para las barras superior e inferior */
  overflow-y: auto;
`;

// Título del juego
const GameTitle = styled.h1`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  text-align: center;
  margin-top: 20px;
`;

const Domino = () => {
  return (
    <GameContainer>
      <TopBar title="Dominó" />
      <GameContent>
        <GameTitle>¡Bienvenido al juego de Dominó!</GameTitle>
        {/* Aquí irá el contenido del juego */}
      </GameContent>
      <BottomNavBar />
    </GameContainer>
  );
};

export default Domino;
