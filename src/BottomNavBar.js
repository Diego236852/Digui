import React from 'react';
import styled from 'styled-components';
import { FaHome, FaBook, FaGamepad, FaBell, FaCog } from 'react-icons/fa';

const BottomNavBar = () => {
  return (
    <NavBarContainer>
      <NavButton>
        <FaHome size={24} />
        <ButtonLabel>Inicio</ButtonLabel>
      </NavButton>
      <NavButton>
        <FaBook size={24} />
        <ButtonLabel>Educación</ButtonLabel>
      </NavButton>
      <NavButton>
        <FaGamepad size={24} />
        <ButtonLabel>Juegos</ButtonLabel>
      </NavButton>
      <NavButton>
        <FaBell size={24} />
        <ButtonLabel>Notificaciones</ButtonLabel>
      </NavButton>
      <NavButton>
        <FaCog size={24} />
        <ButtonLabel>Ajustes</ButtonLabel>
      </NavButton>
    </NavBarContainer>
  );
};

export default BottomNavBar;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #6b21a8;
  padding: 15px 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Sombra para la barra inferior */
`;

const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* Agranda los botones cuando se pasa el cursor */
  }
`;

const ButtonLabel = styled.span`
  font-size: 13px;
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
