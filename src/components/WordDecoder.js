import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Mapa de símbolos y sus letras correspondientes
const symbolToLetterMap = {
  '🔴': 'A', '🟢': 'B', '🔵': 'C', '🔺': 'D', '🔻': 'E',
  '🔼': 'F', '🟥': 'G', '🟩': 'H', '🟦': 'I', '➕': 'J',
  '✚': 'K', '★': 'L', '◆': 'M', '🔶': 'N', '🔷': 'Ñ',
  '⏺': 'O', '🟢⏺': 'P', '⏹️': 'Q', '❤': 'R', '💚': 'S',
  '💙': 'T', '🔽': 'U', '🟢🔼': 'V', '⏫': 'W', '⬆': 'X',
  '❇️': 'Y', '🔳': 'Z',
};

// Lista de palabras codificadas
const wordList = [
  ['💚', '🟦', '★', '★', '🔴'], // "SILLA"
  ['🟥', '🔴', '💙', '⏺'], // "GATO"
  ['⏹️', '🔽', '🟦', '🔻', '❤', '⏺'], // "QUIERO"
  ['🔴', '❤', '🟢⏺', '⏺', '🔶'], // "ARPON"
];

// Tabla de símbolos con letras para referencia
const symbolTable = [
  ['A', '🔴'], ['B', '🟢'], ['C', '🔵'], ['D', '🔺'], ['E', '🔻'],
  ['F', '🔼'], ['G', '🟥'], ['H', '🟩'], ['I', '🟦'], ['J', '➕'],
  ['K', '✚'], ['L', '★'], ['M', '◆'], ['N', '🔶'], ['Ñ', '🔷'],
  ['O', '⏺'], ['P', '🟢⏺'], ['Q', '⏹️'], ['R', '❤'], ['S', '💚'],
  ['T', '💙'], ['U', '🔽'], ['V', '🟢🔼'], ['W', '⏫'], ['X', '⬆'],
  ['Y', '❇️'], ['Z', '🔳']
];

// Animación de entrada suave
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor principal del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6b21a8, #d8b4fe);
  font-family: 'Quicksand', sans-serif;
  animation: ${fadeIn} 0.8s ease-out;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

// Botón para salir al menú
const ExitButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #d8b4fe;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b983f3;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

// Contenedor del temporizador
const TimerContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 18px;
  color: white;
  font-family: 'Baloo 2', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Título del juego
const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 28px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

// Contenedor para la tabla de símbolos
const SymbolTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
    padding: 8px;
  }
`;

// Celda de la tabla de símbolos
const SymbolCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: #6b21a8;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
`;

// Contenedor para los símbolos codificados (palabra codificada)
const SymbolContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

// Cada símbolo individual (letras de la palabra codificada)
const Symbol = styled.div`
  font-size: 30px;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #6b21a8;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 6px;
  }
`;

// Caja de texto donde el jugador coloca la palabra decodificada
const AnswerBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

// Input para ingresar la letra decodificada (palabra sin codificar)
const InputLetter = styled.input`
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #6b21a8;
  border-radius: 8px;
  background-color: white;
  color: #6b21a8;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #d8b4fe;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
`;

// Botón para verificar la respuesta
const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #d8b4fe;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #b983f3;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const WordDecoder = ({ onExitToMenu }) => {
  const [userAnswer, setUserAnswer] = useState([]);
  const [encodedSymbols, setEncodedSymbols] = useState([]);
  const [score, setScore] = useState(0); 
  const [timer, setTimer] = useState(60); 
  const timerRef = useRef(null); 

  useEffect(() => {
    generateNewWord();
    startTimer();

    return () => clearInterval(timerRef.current); 
  }, []);

  const handleLetterInput = (index, value) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = value.toUpperCase(); 
    setUserAnswer(newAnswer);
  };

  const checkAnswer = () => {
    const decodedWord = encodedSymbols.map(symbol => symbolToLetterMap[symbol]).join('');
    if (userAnswer.join('') === decodedWord) {
      setScore(score + 90); 
      alert(`¡Correcto! Has ganado 90 puntos.`);
      generateNewWord(); 
    } else {
      alert('Intenta de nuevo.');
    }
  };

  const generateNewWord = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setEncodedSymbols(randomWord);
    setUserAnswer(Array(randomWord.length).fill('')); 
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          alert('¡Se acabó el tiempo!');
          return 60; 
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <GameContainer>
      {/* Botón para salir al menú */}
      <ExitButton onClick={onExitToMenu}>←</ExitButton>

      {/* Temporizador en la esquina superior derecha */}
      <TimerContainer>Tiempo: {timer} s</TimerContainer>

      <Title>Decodifica la Palabra</Title>

      <SymbolTableContainer>
        {symbolTable.map(([letter, symbol], index) => (
          <SymbolCell key={index}>
            <div>{letter}</div>
            <div>{symbol}</div>
          </SymbolCell>
        ))}
      </SymbolTableContainer>
      
      <SymbolContainer>
        {encodedSymbols.map((symbol, index) => (
          <Symbol key={index}>{symbol}</Symbol>
        ))}
      </SymbolContainer>

      <AnswerBox>
        {userAnswer.map((letter, index) => (
          <InputLetter
            key={index}
            type="text"
            maxLength="1"
            value={letter}
            onChange={(e) => handleLetterInput(index, e.target.value)}
          />
        ))}
      </AnswerBox>

      <Button onClick={checkAnswer}>Verificar</Button>
    </GameContainer>
  );
};

export default WordDecoder;
