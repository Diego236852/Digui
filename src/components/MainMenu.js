import React from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from './TopBar'; // Importa la barra superior
import BottomNavBar from './BottomNavBar'; // Importa la barra inferior
import ABCPiensa_icon from './../images/MainMenu/ABCicon.svg';
import '@fontsource/baloo-2';  // Fuente Baloo
import '@fontsource/poppins/700.css';  // Fuente Poppins Bold
import '@fontsource/quicksand';  // Fuente Quicksand

// Animación para hacer que el menú principal aparezca deslizando desde abajo
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px); /* Comienza fuera de la pantalla */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Entra completamente en pantalla */
  }
`;

// Animación de fade-in para las tarjetas del juego
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px); /* Pequeño desplazamiento desde abajo */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Aparece en la posición final */
  }
`;

// Animación de movimiento flotante para las formas geométricas
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MainMenu = ({ onGameSelect }) => {
  // Función para manejar el clic en un juego específico
  const handleGameClick = (game) => {
    onGameSelect(game);  // Usa la función pasada desde App.js para seleccionar el juego
  };

  return (
    <MainContainer>
      <TopBar title="Juegos" />

      {/* Formas geométricas animadas en el fondo */}
      <FloatingShapes>
        <Circle size="100px" top="10%" left="5%" color="#e0b3ff" />
        <Triangle size="120px" top="20%" right="10%" color="#b3e0ff" />
        <Square size="80px" bottom="15%" left="15%" color="#ffb3b3" />
        <Star size="100px" top="35%" left="50%" color="#ffd1b3" />
      </FloatingShapes>

      <GameContent>
        <GameGrid>
          <GameCard onClick={() => handleGameClick('ABC Piensa')}>
            <GameImage src={ABCPiensa_icon} alt="ABC Piensa!" />
            <GameTitle>A B C Piensa!</GameTitle>
          </GameCard>
          <GameCard>
            <GameImage src={ABCPiensa_icon} alt="Dominó" />
            <GameTitle>Dominó</GameTitle>
          </GameCard>
          <GameCard>
            <GameImage src={ABCPiensa_icon} alt="Lanza y Diviértete con las letras" />
            <GameTitle>Lanza y Diviértete con las letras</GameTitle>
          </GameCard>
          <GameCard>
            <GameImage src={ABCPiensa_icon} alt="Ruleta de la Suerte" />
            <GameTitle>Ruleta de la Suerte</GameTitle>
          </GameCard>
        </GameGrid>
      </GameContent>

      <BottomNavBar />
    </MainContainer>
  );
};

export default MainMenu;

// Contenedor principal restaurado al fondo original
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #f3e5f5; /* Fondo original sin gradiente */
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 1s ease-in-out;
  font-family: 'Quicksand', sans-serif; /* Fuente Quicksand para la mayoría del texto */
`;

const GameContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* Agrega scroll solo al área de juegos si es necesario */
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Ajusta las columnas según el espacio disponible */
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
  height: 100%;
`;

const GameCard = styled.div`
  font-family: 'Poppins', sans-serif; /* Fuente Poppins Bold para títulos destacados */
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  max-width: 250px; /* Limita el tamaño máximo de las tarjetas */
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out forwards; /* Animación para que las tarjetas aparezcan con un efecto fade-in */

  &:hover {
    transform: translateY(-15px) scale(1.05); /* Se mueve hacia arriba y se agranda un poco */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
  }

  &:active {
    transform: scale(0.98); /* Disminuye ligeramente cuando se hace clic */
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px; /* Aumenta la altura de la imagen para ocupar más espacio */
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const GameTitle = styled.h3`
  font-family: 'Baloo 2', cursive; /* Fuente Baloo para los títulos de los juegos */
  font-size: 16px;
  color: #6b21a8;
  font-weight: bold;
  margin: 0;
`;

// Contenedor de las formas flotantes
const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

// Círculo flotante
const Circle = styled.div`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 4s ease-in-out infinite; /* Animación más rápida */
`;

// Cuadrado flotante
const Square = styled.div`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.color};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 5s ease-in-out infinite;
`;

// Triángulo flotante
const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${(props) => props.size} solid transparent;
  border-right: ${(props) => props.size} solid transparent;
  border-bottom: ${(props) => `calc(${props.size} * 1.5)`} solid ${(props) => props.color};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 6s ease-in-out infinite;
`;

// Estrella flotante
const Star = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${(props) => props.size} solid transparent;
  border-right: ${(props) => props.size} solid transparent;
  border-bottom: ${(props) => `calc(${props.size} * 1.5)`} solid ${(props) => props.color};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 5s ease-in-out infinite;
`;
