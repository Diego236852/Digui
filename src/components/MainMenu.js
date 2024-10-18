import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';
import TopBar from './TopBar';
import BottomNavBar from './BottomNavBar';
import ABCPiensa_icon from './../images/MainMenu/ABCRealIcon.svg';
import Domino_icon from './../images/MainMenu/ABCicon.svg';
import LanzayDiviertete_icon from './../images/MainMenu/ABCicon.svg';
import RuletaSuerte_icon from './../images/MainMenu/ABCicon.svg';
import welcomeAudio from './../audios/MainMenu/welcome.mp3';

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

// Contenedor principal
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #f3e5f5;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 1s ease-in-out;
  font-family: 'Quicksand', sans-serif; 
`;

// Aseguramos que TopBar esté siempre visible con position fixed
const FixedTopBar = styled(TopBar)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10; 
`;

// Aseguramos que BottomNavBar esté siempre visible con position fixed
const FixedBottomNavBar = styled(BottomNavBar)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10; 
`;

// Contenido del juego con espacio para las barras superior e inferior
const GameContent = styled.div`
  flex: 1;
  padding: 80px 20px 90px;
  overflow-y: auto; 
`;

// Estilos para GameGrid, GameCard, etc.
const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Para pantallas medianas */
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr; /* Para pantallas pequeñas pero no móviles */
    grid-gap: 10px; /* Reducir el espacio entre los elementos */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Para pantallas pequeñas (teléfonos) */
    grid-gap: 15px;
  }
`;

const GameCard = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  max-width: 250px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out forwards;

  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    max-width: 200px; /* Ajusta el tamaño máximo para pantallas medianas */
  }

  @media (max-width: 576px) {
    max-width: 180px; /* Ajusta el tamaño máximo para pantallas entre 576px y 768px */
  }

  @media (max-width: 480px) {
    max-width: 100%; /* Tarjetas ocuparán todo el ancho en pantallas pequeñas */
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    height: 120px; /* Ajusta la altura de las imágenes para pantallas medianas */
  }

  @media (max-width: 576px) {
    height: 100px; /* Imágenes más pequeñas para pantallas entre 576px y 768px */
  }

  @media (max-width: 480px) {
    height: 100px; /* Imágenes más pequeñas en pantallas pequeñas */
  }
`;

const GameTitle = styled.h3`
  font-family: 'Baloo 2', cursive;
  font-size: 16px;
  color: #6b21a8;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px; /* Ajusta el tamaño de la fuente para pantallas medianas */
  }

  @media (max-width: 576px) {
    font-size: 13px; /* Ajusta el tamaño de la fuente para pantallas entre 576px y 768px */
  }

  @media (max-width: 480px) {
    font-size: 12px; /* Ajusta el tamaño de la fuente para pantallas pequeñas */
  }
`;

const MainMenu = ({ onGameSelect, onSettingsSelect, onHomeSelect }) => {
  useEffect(() => {
    const hasPlayedAudio = Cookies.get('hasPlayedAudio');

    if (!hasPlayedAudio) {
      const audio = new Audio(welcomeAudio);
      audio.play();
      Cookies.set('hasPlayedAudio', 'true', { expires: 1 });
    }
  }, []);

  const handleGameClick = (game) => {
    if (onGameSelect) {
      onGameSelect(game);
    }
  };

  return (
    <MainContainer>
      <FixedTopBar title="Juegos" />
      <GameContent>
        <GameGrid>
          <GameCard onClick={() => handleGameClick('ABC Piensa')}>
            <GameImage src={ABCPiensa_icon} alt="ABC Piensa!" />
            <GameTitle>A B C Piensa!</GameTitle>
          </GameCard>
          <GameCard onClick={() => handleGameClick('Domino')}>
            <GameImage src={Domino_icon} alt="Dominó" />
            <GameTitle>Dominó</GameTitle>
          </GameCard>
          <GameCard onClick={() => handleGameClick('LanzayDiviertete')}>
            <GameImage src={LanzayDiviertete_icon} alt="Lanza y Diviértete con las letras" />
            <GameTitle>Lanza y Diviértete con las letras</GameTitle>
          </GameCard>
          <GameCard onClick={() => handleGameClick('RuletaSuerte')}>
            <GameImage src={RuletaSuerte_icon} alt="Ruleta de la Suerte" />
            <GameTitle>Ruleta de la Suerte</GameTitle>
          </GameCard>
        </GameGrid>
      </GameContent>
      <FixedBottomNavBar 
        onSettingsSelect={onSettingsSelect} 
        onHomeSelect={onHomeSelect} // Aseguramos que onHomeSelect esté disponible
      />
    </MainContainer>
  );
};

export default MainMenu;
