import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import checkIcon from './check-icon.svg'; // Ícono de check
import image1 from './triangle.png'; // Imagen de triángulo
import image2 from './circle.png'; // Imagen de círculo
import image3 from './star.png'; // Imagen de estrella
import circleImage from './circle-logo.svg'; // Imagen del círculo del logo
import letterD from './letter-d.svg'; // Letra D separada
import letterI from './letter-i.svg'; // Letra I separada
import letterG from './letter-g.svg'; // Letra G separada
import letterU from './letter-u.svg'; // Letra U separada
import letterI2 from './letter-i2.svg'; // Segunda letra I separada

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

const LoginSuccessful = ({ onContinue }) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        onContinue(); // Cambiar a MainMenu cuando la animación termina
      }, 6500); // 5.5 segundos en total para esperar que la última letra termine y luego 2 segundos más

      return () => clearTimeout(timer);
    }
  }, [showLogo, onContinue]);

  return (
    <Background>
      {/* Imágenes flotantes en el fondo */}
      <FloatingImage src={image1} alt="Triangle" size="120px" top="10%" left="15%" duration="6s" />
      <FloatingImage src={image2} alt="Circle" size="100px" top="70%" right="10%" duration="4.5s" />
      <FloatingImage src={image3} alt="Star" size="80px" bottom="20%" left="20%" duration="5s" />

      {!showLogo && (
        <div style={{ textAlign: 'center' }}>
          <CheckIcon src={checkIcon} alt="Check" />
          <SuccessText>¡Inicio de sesión exitoso!</SuccessText>
        </div>
      )}

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
  );
};

export default LoginSuccessful;
