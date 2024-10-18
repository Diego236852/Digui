import React, { useState } from 'react';
import styled from 'styled-components';

// Definimos los símbolos y las letras que representan, según la tabla proporcionada
const symbolToLetterMap = {
  '🔴': 'A', '🟢': 'B', '🔵': 'C', '🔺': 'D', '🔻': 'E',
  '🔼': 'F', '🟥': 'G', '🟩': 'H', '🟦': 'I', '➕': 'J',
  '➖': 'K', '➕🔵': 'L', '◆': 'M', '🔶': 'N', '🔷': 'Ñ',
  '⏺': 'O', '🟢⏺': 'P', '⏹️': 'Q', '❤': 'R', '💚': 'S',
  '💙': 'T', '🔽': 'U', '🟢🔼': 'V', '⏫': 'W', '⬆': 'X',
  '❇️': 'Y', '🔳': 'Z',
};

// Aquí se definen los símbolos que el jugador debe decodificar (ejemplo de una palabra)
const encodedSymbols = ['🔴', '🟢', '🔵', '🔺']; // Simbolizan la palabra "ABCD"

// Contenedor principal del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  font-family: 'Quicksand', sans-serif;
`;

// Título del juego
const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 36px;
  color: #6b21a8;
  margin-bottom: 20px;
`;

// Contenedor para los símbolos codificados
const SymbolContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// Cada símbolo individual
const Symbol = styled.div`
  font-size: 40px;
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Caja de texto donde el jugador coloca la letra decodificada
const AnswerBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// Input para ingresar la letra decodificada
const InputLetter = styled.input`
  width: 50px;
  height: 50px;
  font-size: 30px;
  text-align: center;
  border: 2px solid #6b21a8;
  border-radius: 10px;
  background-color: white;
  outline: none;
`;

// Botón para verificar la respuesta
const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #6b21a8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a189a;
  }
`;

const WordDecoder = ({ onExitToMenu }) => {
  const [userAnswer, setUserAnswer] = useState(Array(encodedSymbols.length).fill('')); // Estado para las respuestas del jugador

  // Maneja cuando el usuario ingresa una letra
  const handleLetterInput = (index, value) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = value.toUpperCase(); // Asegura que sea mayúscula
    setUserAnswer(newAnswer);
  };

  // Verifica si la respuesta es correcta
  const checkAnswer = () => {
    const decodedWord = encodedSymbols.map(symbol => symbolToLetterMap[symbol]).join('');
    if (userAnswer.join('') === decodedWord) {
      alert(`¡Correcto! Decodificaste la palabra: ${decodedWord}`);
    } else {
      alert('Intenta de nuevo.');
    }
  };

  return (
    <GameContainer>
      <Title>Decodifica la Palabra</Title>
      
      {/* Mostrar los símbolos codificados */}
      <SymbolContainer>
        {encodedSymbols.map((symbol, index) => (
          <Symbol key={index}>{symbol}</Symbol>
        ))}
      </SymbolContainer>

      {/* Caja para que el usuario ingrese la palabra decodificada */}
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

      {/* Botón para verificar la respuesta */}
      <Button onClick={checkAnswer}>Verificar</Button>
      <Button onClick={onExitToMenu} style={{ marginTop: '10px' }}>Salir al Menú</Button>
    </GameContainer>
  );
};

export default WordDecoder;
