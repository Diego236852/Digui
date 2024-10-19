import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Definimos las tareas que pueden salir
const tasks = [
  "Sonrie con la boca abierta",
  "Pronuncia la letra k varias veces seguidas",
  "Tocate los labios con la lengua",
  "Mueve los labios de derecha a izquierda",
  "Haz fuerza con la lengua contra las mejillas",
  "Sonrie con la boca cerrada mientras aprietas los labios",
  "Abre y cierra la boca varias veces",
  "Aprieta y cierra los labios",
  "Saca tu lengua hasta tocar las comisuras de la boca",
  "Presiona tu mejilla con tus dedos y pronuncia las vocales",
  "Presiona tu lengua contra tus labios",
  "Haz movimientos circulares con la lengua dentro de tu boca",
  "Simula toser",
  "Dobla tu lengua y forma un taco",
  "Saca y mete la lengua varias veces",
  "Saborea los labios",
  "Voltea tu lengua",
  "Sonrie mientras pronuncias las vocales",
  "Simular roncar",
  "Haz el sonido del trote de un caballo",
  "Intenta tocar tu nariz con tu lengua",
  "Barre tu paladar con la punta de tu lengua",
  "Simula bostezar",
  "Mueve tu mandibula de derecha a izquierda",
];

// Definimos los nombres de los participantes
const participants = ['Participante 1', 'Participante 2', 'Participante 3'];

// Animación para resaltar un participante
const highlight = keyframes`
  0% { background-color: #fff; }
  100% { background-color: #ffe39f; }
`;

// Contenedor principal
// Contenedor principal con un nuevo fondo de gradiente suave
const RuletaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #d8b4fe, #f3e5f5, #ffe39f); /* Gradiente personalizado */
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;


// Estilos para el botón de girar
const SpinButton = styled.button`
  padding: 14px 28px;
  font-size: 20px;
  background: linear-gradient(135deg, #d8b4fe, #b39ddb); /* Colores púrpuras */
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #b39ddb;
    transform: scale(1.08);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #9575cd;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 12px 24px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

// Contenedor de los participantes
const ParticipantsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
  }
`;

// Estilos para cada participante
const Participant = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? '#ffe39f' : '#fff')};
  border: 3px solid #6b21a8;
  border-radius: 50%; /* Redondeado como fichas de casino */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  ${({ isActive }) =>
    isActive &&
    `
      transform: scale(1.1);
      box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
    `}

  &:hover {
    transform: scale(1.05);
    background-color: #ffe39f;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

// Contenedor del mazo de cartas
const DeckContainer = styled.div`
  perspective: 1000px;
  margin-top: 20px;
`;

// Estilos para la carta (el contenedor de ambas caras)
const Card = styled.div`
  width: 150px;
  height: 200px;
  background-color: transparent;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  ${({ isFlipped }) => isFlipped && css`
    transform: rotateY(180deg);
  `}
`;

// Estilos para cada cara de la carta
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

// Cara frontal de la carta (antes de voltear)
const CardFront = styled(CardFace)`
  background-color: #6b21a8;
`;

// Cara trasera de la carta (cuando se voltea)
const CardBack = styled(CardFace)`
  background-color: #ffe39f;
  color: #333;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
`;

// Contenedor para el texto de la carta
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Componente principal
const RuletaSuerte = ({ onExitToMenu }) => {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Función que inicia la ruleta
  const spinWheel = () => {
    setIsSpinning(true);
    setIsFlipped(false); // Reseteamos la carta al estado original

    let currentIndex = 0;
    const rounds = 15;
    const totalIterations = rounds + Math.floor(Math.random() * participants.length);

    const interval = setInterval(() => {
      setActiveIndex(currentIndex % participants.length);
      currentIndex += 1;

      if (currentIndex >= totalIterations) {
        clearInterval(interval);

        const finalTask = tasks[Math.floor(Math.random() * tasks.length)];
        setSelectedTask(finalTask);
        setIsSpinning(false);

        // Volteamos la carta después de que se elija al participante
        setTimeout(() => setIsFlipped(true), 500);
      }
    }, 200);
  };

  return (
    <RuletaContainer>
      <h1 style={{ fontFamily: 'Baloo 2', fontSize: '32px', color: '#6b21a8', marginBottom: '10px' }}>
        Ruleta de la Suerte
      </h1>
      <ParticipantsContainer>
        {participants.map((participant, index) => (
          <Participant key={index} isActive={index === activeIndex}>
            {participant}
          </Participant>
        ))}
      </ParticipantsContainer>

      {/* Mazo de cartas */}
      <DeckContainer>
        <Card isFlipped={isFlipped}>
          <CardFront>Ruleta</CardFront>
          <CardBack>
            <TextWrapper>
              <div>{selectedTask}</div>
            </TextWrapper>
          </CardBack>
        </Card>
      </DeckContainer>

      <SpinButton onClick={spinWheel} disabled={isSpinning} style={{ marginTop: '20px' }}>
        {isSpinning ? 'Girando...' : 'Girar la ruleta'}
      </SpinButton>
      
      <SpinButton onClick={onExitToMenu} style={{ marginTop: '10px' }}>
        Volver al menú principal
      </SpinButton>
    </RuletaContainer>
  );
};

export default RuletaSuerte;
