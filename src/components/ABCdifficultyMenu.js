import React from 'react';
import styled, { keyframes } from 'styled-components';
import backArrowIcon from './../images/ABCPiensa/turn-back.svg';


// Animación de flotación para las formas geométricas
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

// Animación de aparición secuencial
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Nueva animación para los botones, que caen desde arriba
const dropIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px);  /* Comienza fuera de la vista, desde arriba */
  }
  100% {
    opacity: 1;
    transform: translateY(0);  /* Termina en su posición original */
  }
`;

// Animación para el botón de regresar, que entra desde la izquierda
const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);  /* Empieza desplazado hacia la izquierda */
  }
  100% {
    opacity: 1;
    transform: translateX(0);  /* Se posiciona en su lugar original */
  }
`;

// Animación para el botón de dificultad (pulse)
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #f3e5f5);
  position: relative;
  overflow: hidden;

  @media (orientation: portrait) {
    padding: 0 20px;
    justify-content: center; /* Centrar todo el contenido en pantallas verticales */
  }
`;

// Modificamos TitleContainer para que divida el texto por palabras
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: 'Baloo 2', cursive;
  font-size: 36px;
  color: #6b21a8;
  margin-bottom: 40px;
  flex-wrap: wrap; /* Permitir que las palabras se dividan correctamente */

  @media (max-width: 768px) {
    font-size: 28px; /* Tamaño más pequeño en pantallas verticales */
    margin-bottom: 20px;
  }
`;

// Cada palabra tendrá un retraso para la animación
const TitleWord = styled.span`
  display: inline-block;
  margin-right: 8px; /* Espacio entre palabras */
  opacity: 0;
  animation: ${fadeInUp} 0.5s forwards;
  animation-delay: ${(props) => props.delay}s;  /* Añadimos el delay dinámico */
`;

const DifficultyButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 15px 25px;
  font-size: 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${dropIn} 0.8s ease-out forwards, ${pulse} 2s infinite ease-in-out;  /* Animación de caída y pulso */
  animation-delay: ${(props) => props.delay}s;

  &:hover {
    background-color: #5a189a;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (orientation: portrait) {
    width: 100%;  /* Botones ocupan todo el ancho disponible solo en vertical */
    margin-bottom: 15px; /* Añadir margen entre los botones */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;  /* Apilar los botones en pantallas verticales */
  justify-content: center;
  width: 60%;

  @media (orientation: landscape) {
    flex-direction: row;  /* Mantener los botones en línea horizontal en pantallas horizontales */
    justify-content: space-around;
    width: 80%;  /* Ajustar el ancho en pantallas horizontales */
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  animation: ${slideInFromLeft} 0.8s ease-out forwards; /* Animación de entrada desde la izquierda */

  img {
    width: 50px; /* Hacer el botón de regresar un poco más grande */
    height: auto;
  }

  @media (orientation: portrait) {
    img {
      width: 40px; /* Hacer el botón más pequeño en pantallas verticales */
    }
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : '0')};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  opacity: 0.3;

  @media (max-width: 768px) {
    width: calc(${(props) => props.size} / 1.5);  /* Reducir tamaño en móviles */
    height: calc(${(props) => props.size} / 1.5); /* Reducir tamaño en móviles */
  }
`;


const ABCdifficultyMenu = ({ onSelectDifficulty, onBack }) => {
  const title = "Selecciona el nivel de dificultad";
  const words = title.split(' ');  // Dividimos la frase en palabras

  
  return (
    <MenuContainer>
      <BackButton onClick={onBack}>
        <img src={backArrowIcon} alt="Back to menu" />
      </BackButton>

      <TitleContainer>
        {words.map((word, index) => (
          <TitleWord key={index} delay={index * 0.2}>
            {word}
          </TitleWord>
        ))}
      </TitleContainer>

      <ButtonContainer>
        <DifficultyButton onClick={() => onSelectDifficulty('facil')} delay={1}>
          Fácil
        </DifficultyButton>
        <DifficultyButton onClick={() => onSelectDifficulty('medio')} delay={1.5}>
          Medio
        </DifficultyButton>
        <DifficultyButton onClick={() => onSelectDifficulty('dificil')} delay={2}>
          Difícil
        </DifficultyButton>
      </ButtonContainer>

      <FloatingShape size="100px" color="#b3e5fc" shape="circle" top="10%" left="5%" duration={6} />
      <FloatingShape size="120px" color="#ffcdd2" shape="square" bottom="15%" right="10%" duration={8} />
      <FloatingShape size="80px" color="#d1c4e9" shape="circle" top="50%" left="50%" duration={7} />
    </MenuContainer>
  );
};


export default ABCdifficultyMenu;
