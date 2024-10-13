import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';

// Animaciones para hacer que el componente aparezca suavemente
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

// Contenedor principal del componente
const GameModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #9155fd, #6b21a8);
  padding: 20px;
  animation: ${fadeIn} 0.6s ease;
`;

// Estilo del cuadro principal con opciones
const OptionsBox = styled.div`
  background-color: #f3e5f5;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  color: #4a148c;
`;

// Título del componente
const Title = styled.h2`
  font-family: 'Baloo 2', cursive;
  font-size: 24px;
  margin-bottom: 30px;
  color: #6b21a8;
`;

// Botones para seleccionar las opciones del juego
const OptionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6b21a8;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  padding: 15px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #532190;
  }
  
  &:active {
    background-color: #4a148c;
  }
`;

// Desplegable para la selección de opciones
const Dropdown = styled.div`
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  max-height: ${(props) => (props.isOpen ? '150px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  color: #6b21a8;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const BackButton = styled(FaArrowLeft)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ChevronIcon = styled(FaChevronDown)`
  font-size: 16px;
  margin-left: 10px;
`;

// Botón de "Iniciar Juego"
const StartButton = styled.button`
  background-color: #6b21a8;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  padding: 15px 30px;
  margin-top: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #532190;
  }
  
  &:active {
    background-color: #4a148c;
  }
`;

const DominoGameModeSelector = ({ onBack, onStartGame }) => {
  const [playersDropdownOpen, setPlayersDropdownOpen] = useState(false);
  const [gameModeDropdownOpen, setGameModeDropdownOpen] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState('Seleccionar');
  const [selectedGameMode, setSelectedGameMode] = useState('Seleccionar');

  // Opciones para los jugadores y modo de juego
  const playerOptions = [2, 3, 4]; // Mínimo 2 jugadores
  const gameModes = ['Clásico']; // Por ahora solo Clásico

  // Verificar si ambas opciones han sido seleccionadas para mostrar el botón de "Iniciar Juego"
  const canStartGame = selectedPlayers !== 'Seleccionar' && selectedGameMode !== 'Seleccionar';

  return (
    <GameModeContainer>
      <BackButton onClick={onBack} />
      <OptionsBox>
        <Title>Opciones de Juego</Title>

        {/* Selección de Número de Jugadores */}
        <OptionButton onClick={() => setPlayersDropdownOpen(!playersDropdownOpen)}>
          Número de Jugadores
          <span>
            {selectedPlayers} <ChevronIcon />
          </span>
        </OptionButton>
        <Dropdown isOpen={playersDropdownOpen}>
          {playerOptions.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => {
                setSelectedPlayers(option);
                setPlayersDropdownOpen(false);
              }}
            >
              {option} Jugador{option > 1 ? 'es' : ''}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Selección de Modo de Juego */}
        <OptionButton onClick={() => setGameModeDropdownOpen(!gameModeDropdownOpen)}>
          Modo de Juego
          <span>
            {selectedGameMode} <ChevronIcon />
          </span>
        </OptionButton>
        <Dropdown isOpen={gameModeDropdownOpen}>
          {gameModes.map((mode) => (
            <DropdownItem
              key={mode}
              onClick={() => {
                setSelectedGameMode(mode);
                setGameModeDropdownOpen(false);
              }}
            >
              {mode}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Botón de "Iniciar Juego" */}
        {canStartGame && (
          <StartButton onClick={() => onStartGame(selectedPlayers)}>
            Iniciar Juego
          </StartButton>
        )}
      </OptionsBox>
    </GameModeContainer>
  );
};

export default DominoGameModeSelector;
