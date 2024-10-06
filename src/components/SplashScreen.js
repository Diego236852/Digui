import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logoCompleto from './images/SplashScreen/Logo DIGUI 2.1.svg';  // Asegúrate de que la ruta sea correcta
import InfoDigui from './components/InfoDigui';  // Componente para la siguiente pantalla

// Definimos los componentes estilizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e5f5, #f0f4c3); /* Gradiente más suave */
  position: relative;
  padding: 0 20px;
  overflow: hidden;

  /* Formas geométricas como pseudoelementos */
  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(255, 235, 59, 0.3); /* Color amarillo pastel */
    border-radius: 50%;
    z-index: 0;
  }

  &::before {
    width: 300px;
    height: 300px;
    top: -50px;
    left: -50px; /* Círculo morado en la esquina superior izquierda */
    background: rgba(103, 80, 164, 0.3); /* Morado pastel */
  }

  &::after {
    width: 180px;
    height: 180px;
    bottom: -30px;
    right: -30px; /* Círculo celeste en la esquina inferior derecha */
    background: rgba(3, 218, 198, 0.3); /* Celeste pastel */
  }

  @media (min-aspect-ratio: 4/3) {
    &::before {
      width: 350px;
      height: 350px;
      top: -100px;
      left: -100px;
    }
    &::after {
      width: 250px;
      height: 250px;
      bottom: -80px;
      right: -80px;
    }
  }
`;

const WelcomeText = styled(motion.h1)`
  font-size: 5vw;
  font-weight: bold;
  color: #6b21a8;
  margin-bottom: 4vh;
  z-index: 1; /* Aseguramos que el texto esté por encima de las formas geométricas */

  @media (min-aspect-ratio: 4/3) {
    font-size: 3vw;
  }
`;

const Logo = styled(motion.img)`
  max-width: 40vw;
  height: auto;
  margin-bottom: 4vh;
  z-index: 1; /* Aseguramos que el logo esté por encima de las formas geométricas */

  @media (min-aspect-ratio: 4/3) {
    max-width: 25vw;
  }
`;

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Simulamos un tiempo de duración del SplashScreen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);  // Ocultamos el SplashScreen después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible ? (
        <Container>
          <WelcomeText
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 1 } }} // Animación de salida
          >
            Bienvenido
          </WelcomeText>

          <Logo
            src={logoCompleto}
            alt="Logotipo completo"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, ease: "easeInOut", type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 1 } }}  // Animación de salida
          />
        </Container>
      ) : (
        <InfoDigui />  // Mostramos la siguiente pantalla
      )}
    </>
  );
};

export default SplashScreen;
