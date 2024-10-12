import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import imageDatabase from './ABCPiensaImageDatabase'; // Importar las imágenes a usar
import AreYouSure from './AreYouSure'; // Importar el componente AreYouSure
import Particles from 'react-tsparticles'; // Para partículas de celebración
import correctSoundFile from './../audios/ABCPiensa/correct.mp3'; // Importar sonido de acierto
import errorSoundFile from './../audios/ABCPiensa/error.mp3'; // Importar sonido de error
import selectSoundFile from './../audios/ABCPiensa/select.mp3'; // Importar sonido de selección

// Definición de la animación shake (error)
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// Definición de la animación bounce (correcto)
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Definición de la animación fadeIn para la entrada suave
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Definición de DroppedImage
const DroppedImage = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5px;
  left: 5px;
  object-fit: contain;
  animation: ${fadeIn} 0.5s ease;

  @media (orientation: portrait) {
    width: 35px;
    height: 35px;
  }
`;

// Definición de CardFront y CardBack con animación
const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-color: #f9c7ff; /* Fondo rosado claro */
  border-radius: 10px;
  border: 3px solid #e57373; /* Borde de color rosa más oscuro */
`;

const CardBack = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 10px;
  animation: ${fadeIn} 0.5s ease;
`;

// Contenedor del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding: 10px;
  position: relative;
  overflow: hidden;

  @media (orientation: portrait) {
    padding: 5px;
  }
`;

// Botón de regreso
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  background-color: #6b21a8;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    background-color: #5a189a;
  }

  @media (orientation: portrait) {
    font-size: 16px;
    padding: 8px 12px;
  }
`;

// Grid de letras
const LettersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-gap: 15px;
  margin-bottom: 20px;
  background-color: #d1c4e9;
  padding: 20px;
  border-radius: 15px;
  ${(props) =>
    props.initialRender
      ? css`
          animation: ${fadeIn} 0.5s ease;
        `
      : ''}

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 60px);
    grid-gap: 10px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 50px);
    grid-gap: 8px;
    padding: 10px;
  }

  @media (orientation: portrait) {
    grid-template-columns: repeat(3, 50px);
    grid-gap: 8px;
    padding: 10px;
    margin-bottom: 15px;
  }
`;

// Cuadro de letras con animación de entrada y éxito
const LetterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.error ? '#ffb3b3' : '#f0e5ff')};
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  ${(props) =>
    props.error
      ? css`
          animation: ${shake} 0.5s ease-in-out;
        `
      : ''};
  ${(props) =>
    props.correct
      ? css`
          animation: ${bounce} 0.5s ease-in-out;
        `
      : ''};
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  @media (orientation: portrait) {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
`;

// Contenedor de las imágenes ajustado para 5 columnas
const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columnas distribuidas equitativamente */
  grid-auto-rows: min-content; /* Ajuste de altura automática según el contenido */
  gap: 20px; /* Espacio entre las columnas */
  width: 100%; /* Ocupa todo el ancho disponible */
  margin-top: 10px;
  background-color: #fff6b7;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-items: center; /* Asegura que las imágenes estén centradas */
  animation: ${fadeIn} 0.8s ease;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (orientation: portrait) {
    width: 95%;
    padding: 5px;
    margin-top: 10px;
  }
`;

// Temporizador
const Timer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  color: #6b21a8;
  animation: ${fadeIn} 0.5s ease;

  @media (orientation: portrait) {
    font-size: 18px;
    padding: 8px;
  }
`;

// Contenedor de cartas con margen ajustado para apilarlas
const CardContainer = styled.div`
  perspective: 1000px;
  margin: -20px;
  z-index: ${(props) => props.index}; /* Asegura que las imágenes se apilen en orden */
`;

// Componente de las cartas ajustadas
const FlipCard = styled.div`
  width: 55px; /* Reducido para que ocupen menos espacio */
  height: 55px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${(props) =>
    props.isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
  ${(props) =>
    props.error &&
    css`
      animation: ${shake} 0.5s ease-in-out;
    `}

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media (orientation: portrait) {
    width: 45px;
    height: 45px;
  }
`;

// Definición de initialLetters
const initialLetters = ['A'];

// Definición de initialImages como el conjunto de imágenes importadas
const initialImages = imageDatabase.slice(0, 1); // Solo 1 imagen para pruebas

// Definición de la función shuffleArray (revolver las letras)
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Cargar sonidos
const loadAudio = (src) => {
  const audio = new Audio(src);
  return new Promise((resolve) => {
    audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
  });
};

const useSounds = () => {
  const [correctSound, setCorrectSound] = useState(null);
  const [errorSound, setErrorSound] = useState(null);
  const [selectSound, setSelectSound] = useState(null);

  useEffect(() => {
    const loadSounds = async () => {
      const correct = await loadAudio(correctSoundFile);
      const error = await loadAudio(errorSoundFile);
      const select = await loadAudio(selectSoundFile);

      setCorrectSound(correct);
      setErrorSound(error);
      setSelectSound(select);
    };

    loadSounds();
  }, []);

  return { correctSound, errorSound, selectSound };
};

// Componente de partículas de éxito
const SuccessParticles = () => (
  <Particles
    params={{
      particles: {
        number: { value: 50 },
        color: { value: '#FFD700' },
        shape: { type: 'star' },
        size: { value: 5 },
        move: { speed: 2 },
      },
    }}
  />
);

// Función para calcular las estrellas basadas en el tiempo restante
const calculateStars = (timeLeft, totalTime) => {
  const percentageLeft = (timeLeft / totalTime) * 100;

  if (percentageLeft >= 80) {
    return 3; // 3 estrellas si queda más del 80% del tiempo
  } else if (percentageLeft >= 50) {
    return 2; // 2 estrellas si queda más del 50%
  } else {
    return 1; // 1 estrella si queda menos del 50%
  }
};

// Componente principal
const ABCPiensa = ({ difficulty, onGameEnd, onGameLost, onExitToMenu }) => {
  const { correctSound, errorSound, selectSound } = useSounds();
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState({});
  const [images, setImages] = useState(initialImages);
  const [flippedImages, setFlippedImages] = useState({});
  const [letters, setLetters] = useState(shuffleArray([...initialLetters]));
  const totalTime = difficulty === 'facil' ? 180 : difficulty === 'medio' ? 120 : 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [stars, setStars] = useState(0);
  const [showParticles, setShowParticles] = useState(false);

  // Temporizador
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !winner) {
      setGameOver(true);
      onGameLost();
    }
  }, [timeLeft, gameOver, winner, onGameLost]);

  // Finaliza el juego cuando todas las letras se completan
  useEffect(() => {
    if (Object.keys(completed).length === initialImages.length) {
      setGameOver(true);
      setWinner(true);
      setShowParticles(true);
      const finalScore = Math.floor((timeLeft / 60) * 100);
      setScore(finalScore);

      const earnedStars = calculateStars(timeLeft, totalTime);
      setStars(earnedStars); // Asigna las estrellas obtenidas
      onGameEnd(finalScore);
    }
  }, [completed, timeLeft, initialImages.length, onGameEnd, totalTime]);

  const handleSelectImage = (image) => {
    if (selectedImage) {
      if (errorSound) errorSound.play();
      setFlippedImages((prev) => ({ ...prev, [image.letter]: 'error' }));
      setTimeout(() => {
        setFlippedImages((prev) => ({ ...prev, [image.letter]: false }));
      }, 500);
      return;
    }

    if (selectSound) selectSound.play();
    setFlippedImages((prev) => ({ ...prev, [image.letter]: true }));
    setSelectedImage(image);
  };

  const handleLetterClick = (letter) => {
    if (!selectedImage) return;

    if (letter === selectedImage.letter) {
      if (correctSound) correctSound.play();
      setCompleted((prev) => ({ ...prev, [letter]: selectedImage.src }));
      setImages(images.filter((img) => img.letter !== selectedImage.letter));
      setSelectedImage(null);
      setError(null);
    } else {
      if (errorSound) errorSound.play();
      setError(letter);
    }
  };

  const randomizeLetters = () => {
    setLetters(shuffleArray([...letters]));
    setError(null);
    setInitialRender(false);
  };

  // Función para abrir el modal al intentar salir
  const handleBackClick = () => {
    setShowModal(true);
  };

  // Función para manejar la confirmación de salida
  const handleConfirmExit = () => {
    onExitToMenu();
  };

  // Función para cancelar la salida y cerrar el modal
  const handleCancelExit = () => {
    setShowModal(false);
  };

  return (
    <GameContainer onClick={randomizeLetters}>
      <BackButton onClick={handleBackClick}>Regresar</BackButton>

      {showModal && <AreYouSure onConfirm={handleConfirmExit} onCancel={handleCancelExit} />}

      {showParticles && <SuccessParticles />}

      <Timer>Tiempo: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</Timer>

      <div style={{ position: 'absolute', top: '10px', left: '20px', fontSize: '24px', color: 'gold' }}>
        🌟 Estrellas: {stars}
      </div>

      <LettersGrid initialRender={initialRender}>
        {letters.map((letter, index) => (
          <LetterBox
            key={letter}
            error={error === letter}
            correct={completed[letter]}
            onClick={() => handleLetterClick(letter)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {!completed[letter] && letter}
            {completed[letter] && <DroppedImage src={completed[letter]} alt={letter} />}
          </LetterBox>
        ))}
      </LettersGrid>

      <ImagesContainer>
        {images.map((image, index) => (
          <CardContainer key={image.letter} index={index}>
            <FlipCard isFlipped={flippedImages[image.letter] === true} error={flippedImages[image.letter] === 'error'}>
              <CardFront onClick={() => handleSelectImage(image)} />
              <CardBack src={image.src} />
            </FlipCard>
          </CardContainer>
        ))}
      </ImagesContainer>
    </GameContainer>
  );
};

export default ABCPiensa;
