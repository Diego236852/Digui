import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import billete from './billete.png';
import estrella from './estrella.png';
import mochila from './mochila.png';
import zapato from './zapato.png';
import ABCwinnerMenu from './ABCwinnerMenu'; // Importa el menú de ganador
import ABCloser from './ABCloser'; // Importa el componente para cuando pierdes

// Función para mezclar el array de letras
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const initialLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const initialImages = [
  { src: billete, letter: 'B' },
  { src: estrella, letter: 'E' },
  { src: mochila, letter: 'M' },
  { src: zapato, letter: 'Z' }
];

// Animación de error
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const getRandomRotation = () => {
  const randomDegree = Math.floor(Math.random() * 60) - 30;
  return `rotate(${randomDegree}deg)`;
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding: 10px;
`;

const LettersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-gap: 15px;
  margin-bottom: 20px;
  background-color: #d1c4e9;
  padding: 20px;
  border-radius: 15px;

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
`;

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
  animation: ${(props) => (props.error ? shake : 'none')} 0.5s ease-in-out;
  position: relative;
  transform: ${(props) => props.rotation};
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
`;

const DroppedImage = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5px;
  left: 5px;
  object-fit: contain;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 20px;
  background-color: #fff6b7; /* Color amarillo pastel */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Timer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  color: #6b21a8;
`;

const CardContainer = styled.div`
  perspective: 1000px;
`;

const FlipCard = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${(props) => props.isFlipped && css`
    transform: rotateY(180deg);
  `}
  ${(props) => props.error && css`
    animation: ${shake} 0.5s ease-in-out;
  `}

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-color: #f9c7ff;
  border-radius: 10px;
`;

const CardBack = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 10px;
`;

const ABCPiensa = ({ difficulty }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState({});
  const [images, setImages] = useState(initialImages);
  const [flippedImages, setFlippedImages] = useState({});
  const [letters, setLetters] = useState(shuffleArray([...initialLetters]));
  const [timeLeft, setTimeLeft] = useState(difficulty === 'facil' ? 180 : difficulty === 'medio' ? 120 : 10);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false); // Estado para indicar si el jugador ha ganado
  const [score, setScore] = useState(0); // Estado para manejar la puntuación final

  // Temporizador
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !winner) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, winner]);

  // Finaliza el juego cuando todas las letras se completan
  useEffect(() => {
    if (Object.keys(completed).length === initialImages.length) {
      setGameOver(true);
      setWinner(true);
      const finalScore = Math.floor((timeLeft / 60) * 100); // Calcula la puntuación en base al tiempo restante
      setScore(finalScore);
    }
  }, [completed, timeLeft]);

  const handleSelectImage = (image) => {
    if (selectedImage) {
      setFlippedImages((prev) => ({ ...prev, [image.letter]: 'error' }));
      setTimeout(() => {
        setFlippedImages((prev) => ({ ...prev, [image.letter]: false }));
      }, 500);
      return;
    }

    setFlippedImages((prev) => ({ ...prev, [image.letter]: true }));
    setSelectedImage(image);
  };

  const handleLetterClick = (letter) => {
    if (!selectedImage) return;
    if (letter === selectedImage.letter) {
      setCompleted((prev) => ({ ...prev, [letter]: selectedImage.src }));
      setImages(images.filter((img) => img.letter !== selectedImage.letter));
      setSelectedImage(null);
      setError(null);
    } else {
      setError(letter);
    }
  };

  const randomizeLetters = () => {
    setLetters(shuffleArray([...letters]));
    setError(null);
  };

  // Si el jugador ha ganado, mostramos el menú de ganador
  if (winner) {
    return <ABCwinnerMenu score={score} />;
  }

  // Si el tiempo se acaba, mostramos el componente de pérdida (ABCloser)
  if (gameOver && !winner) {
    return <ABCloser />;
  }

  return (
    <GameContainer onClick={randomizeLetters}>
      <Timer>Tiempo: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</Timer>
      <LettersGrid>
        {letters.map((letter) => (
          <LetterBox
            key={letter}
            error={error === letter}
            rotation={getRandomRotation()}
            onClick={() => handleLetterClick(letter)}
          >
            {!completed[letter] && letter}
            {completed[letter] && <DroppedImage src={completed[letter]} alt={letter} />}
          </LetterBox>
        ))}
      </LettersGrid>

      <ImagesContainer>
        {images.map((image) => (
          <CardContainer key={image.letter}>
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
