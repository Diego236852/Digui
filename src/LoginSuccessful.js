import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import MainMenu from './MainMenu'; // Importa el componente MainMenu
import checkIcon from './images/LoginSuccessful/check-icon.svg'; // Ícono de check
import image1 from './images/triangle.png'; // Imágenes de fondo animadas
import image2 from './images/circle.png'; // Imágenes de fondo animadas
import image3 from './images/star.png'; // Imágenes de fondo animadas
import circleImage from './images/LoginSuccessful/circle-logo.svg'; // Imagen del círculo del logo
import letterD from './images/LoginSuccessful/letter-d.svg'; // Letra D separada
import letterI from './images/LoginSuccessful/letter-i.svg'; // Letra I separada
import letterG from './images/LoginSuccessful/letter-g.svg'; // Letra G separada
import letterU from './images/LoginSuccessful/letter-u.svg'; // Letra U separada
import letterI2 from './images/LoginSuccessful/letter-i2.svg'; // Segunda letra I separada

// Animación de flotación para las imágenes
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Animación de zoom y fade-in para el texto
const textZoom = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animación de salida para el texto y el check
const textFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

// Animación de aparición del logo
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Contenedor principal
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e5f5, #e0f7fa);
  position: relative;
  overflow: hidden;
`;

// Estilos para el texto con animación de salida
const SuccessText = styled.h1`
  font-size: 48px;
  color: #6b21a8;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  animation: ${textZoom} 1s ease-in-out, ${textFadeOut} 1s 1s ease-in-out forwards; /* Aparece y luego desaparece más rápido */
`;

// Ícono de check animado con salida
const CheckIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  z-index: 1;
  animation: ${float} 3s ease-in-out infinite, ${textFadeOut} 1s 1s ease-in-out forwards; /* Aparece y luego desaparece más rápido */
`;

// Imágenes animadas en el fondo
const FloatingImage = styled.img`
  position: absolute;
  width: ${(props) => props.size};
  animation: ${float} ${(props) => props.duration} ease-in-out infinite;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
`;

// Contenedor para el logo
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative; /* Asegura que las letras se posicionen sobre el círculo */
`;

// Círculo del logo
const CircleLogo = styled.img`
  width: 300px; /* Ajustado para mayor tamaño */
  height: auto;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 2.5s forwards; /* Aparece después de 2.5 segundos */
  position: relative; /* Centrar el círculo */

  /* Media query para pantallas verticales */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 250px; /* Tamaño reducido para pantallas pequeñas */
  }
`;

// Letras del logo, centradas dentro del círculo
const LettersContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centrar las letras dentro del círculo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Estilos para las letras, con posición relativa al centro
const Letter = styled.img`
  width: 40px;
  height: auto;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out ${(props) => props.delay}s forwards; /* Cada letra tiene un retraso */
  margin: 0 5px; /* Espacio entre las letras */

  /* Media query para pantallas verticales */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 30px; /* Tamaño reducido para pantallas pequeñas */
  }
`;

const LoginSuccessful = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false); // Estado para MainMenu

  useEffect(() => {
    // Mostrar el logo después de 2 segundos
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Mostrar el MainMenu 2 segundos después de que la última letra del logo se haya cargado completamente
  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        setShowMainMenu(true); // Mostrar MainMenu
      }, 6500); // 5.5 segundos en total para esperar que la última letra termine y luego 2 segundos más

      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  return (
    <>
      {!showMainMenu ? (
        <Background>
          {/* Imágenes flotantes en el fondo */}
          <FloatingImage src={image1} size="150px" duration="4s" top="10%" left="10%" />
          <FloatingImage src={image2} size="120px" duration="5s" bottom="15%" right="10%" />
          <FloatingImage src={image3} size="180px" duration="6s" top="20%" right="15%" />

          {/* Ícono de check animado y texto */}
          {!showLogo && (
            <div style={{ textAlign: 'center' }}>
              <CheckIcon src={checkIcon} alt="Check" />
              <SuccessText>¡Inicio de sesión exitoso!</SuccessText>
            </div>
          )}

          {/* Logo de Digui que aparece después */}
          {showLogo && (
            <LogoContainer>
              <CircleLogo src={circleImage} alt="Círculo del Logo" />
              <LettersContainer>
                <Letter src={letterD} alt="D" delay={3} />
                <Letter src={letterI} alt="I" delay={3.5} />
                <Letter src={letterG} alt="G" delay={4} />
                <Letter src={letterU} alt="U" delay={4.5} />
                <Letter src={letterI2} alt="I" delay={5} />
              </LettersContainer>
            </LogoContainer>
          )}
        </Background>
      ) : (
        <MainMenu /> // Muestra el MainMenu después de la animación
      )}
    </>
  );
};

export default LoginSuccessful;
