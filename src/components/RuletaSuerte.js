import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Definimos las tareas que pueden salir
const tasks = [
  "Haz como un caballo",
  "Haz un gesto de alegría",
  "Pronuncia la letra P sin abrir los labios",
  "Salta en un pie",
  "Imita a un gato",
  "Haz una cara graciosa",
  "Canta tu canción favorita sin música",
];

// Definimos los nombres de los participantes
const participants = ['Participante 1', 'Participante 2', 'Participante 3'];

// Animación para resaltar un participante
const highlight = keyframes`
  0% { background-color: #fff; }
  100% { background-color: #ffe39f; }
`;

// Contenedor principal
const RuletaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh; /* Ocupa toda la pantalla para evitar scroll */
  background: linear-gradient(135deg, #f0eaff, #f7f3ff);
  padding: 10px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

// Estilos para el botón de girar
const SpinButton = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background: linear-gradient(135deg, #6b21a8, #9f5dc4);
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #8f4fc3;
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #4e1573;
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 16px;
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
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
  }
`;

// Estilos para cada participante
const Participant = styled.div`
  flex: 1;
  padding: 12px;
  font-size: 18px;
  color: #333;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? '#ffe39f' : '#fff')};
  border: 3px solid #6b21a8;
  border-radius: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
    padding: 10px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

// Contenedor del mazo de cartas
const DeckContainer = styled.div`
  perspective: 1000px; /* Necesario para el efecto de flip 3D */
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
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

// Cara frontal de la carta (antes de voltear)
const CardFront = styled(CardFace)`
  background-color: #6b21a8;
  color: white;
`;

// Cara trasera de la carta (cuando se voltea)
const CardBack = styled(CardFace)`
  background-color: #ffe39f;
  color: #333;
  transform: rotateY(180deg); /* Se voltea en 180 grados */
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  const [isFlipped, setIsFlipped] = useState(false); // Estado para manejar el flip de la carta

  // Función que inicia la ruleta
  const spinWheel = () => {
    setIsSpinning(true);
    setIsFlipped(false); // Reseteamos la carta al estado original

    let currentIndex = 0;
    const rounds = 15; // El número de "vueltas" que dará la ruleta
    const totalIterations = rounds + Math.floor(Math.random() * participants.length); // Asegura que termina en un participante aleatorio

    const interval = setInterval(() => {
      setActiveIndex(currentIndex % participants.length);
      currentIndex += 1;

      // Cuando termina el número de vueltas, seleccionamos al participante final y paramos la animación
      if (currentIndex >= totalIterations) {
        clearInterval(interval);

        const finalIndex = currentIndex % participants.length;
        const finalParticipant = participants[finalIndex];
        const finalTask = tasks[Math.floor(Math.random() * tasks.length)];

        setActiveIndex(finalIndex); // Aseguramos que el índice final sea correcto
        setSelectedParticipant(finalParticipant);
        setSelectedTask(finalTask);
        setIsSpinning(false);

        // Volteamos la carta después de que se elija al participante
        setTimeout(() => setIsFlipped(true), 500);
      }
    }, 200); // El tiempo entre cada cambio de participante
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
              {/*<strong>{selectedParticipant}</strong>*/}
              <div></div>
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
