import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3e5f5;
`;

const Title = styled.h2`
  font-family: 'Baloo 2', cursive;
  font-size: 32px;
  color: #6b21a8;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
`;

const DifficultyButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #5a189a;
  }
`;

const ABCdifficultyMenu = ({ onSelectDifficulty }) => {
  return (
    <MenuContainer>
      <Title>Selecciona el nivel de dificultad</Title>
      <ButtonContainer>
        <DifficultyButton onClick={() => onSelectDifficulty('facil')}>Fácil</DifficultyButton>
        <DifficultyButton onClick={() => onSelectDifficulty('medio')}>Medio</DifficultyButton>
        <DifficultyButton onClick={() => onSelectDifficulty('dificil')}>Difícil</DifficultyButton>
      </ButtonContainer>
    </MenuContainer>
  );
};

export default ABCdifficultyMenu;
