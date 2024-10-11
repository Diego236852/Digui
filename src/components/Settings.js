import React from 'react';
import styled from 'styled-components';
import BottomNavBar from './BottomNavBar'; // Importar BottomNavBar
import TopBar from './TopBar'; // Importar TopBar
import profile_temp_image from './../images/Settings/profile.jpeg';

// Contenedor principal con un ligero sombreado
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding-top: 100px; /* Aumentar el espacio para la barra superior */
  padding-bottom: 100px; /* Aumentar el espacio para la barra inferior */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Hacer scroll si el contenido es demasiado grande */
`;

// Botón de "Cerrar sesión"
const LogoutButton = styled.button`
  background-color: #ff5c5c;
  color: white;
  padding: 15px;
  border-radius: 15px;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04a4a;
  }
`;

// Contenedor de avatar con un tamaño y diseño mejorado
const AvatarContainer = styled.div`
  margin: 20px 0;
  width: 160px; /* Aumentar el tamaño del avatar */
  height: 160px;
  background-color: #e0b3ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Username = styled.h2`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  font-size: 26px; /* Aumentar el tamaño de la fuente */
  margin-bottom: 15px;
  text-align: center;
`;

// Lista de opciones con una mejora en el espaciado y las sombras
const SettingsList = styled.div`
  width: 100%;
  max-width: 400px;
`;

const SettingsItem = styled.div`
  background-color: #6b21a8;
  color: white;
  padding: 20px; /* Aumentar el padding */
  border-radius: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px; /* Aumentar el tamaño de la fuente */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SmallLabel = styled.p`
  font-size: 14px; /* Aumentar un poco el tamaño */
  color: #b8a9d2;
`;

// Estilo para que la barra superior sea fija y ocupe el 100% del ancho
const FixedTopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Estilo para que la barra inferior sea fija y ocupe el 100% del ancho
const BottomNavBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Settings = ({ onBack, onGameSelect, onLogout }) => {
  return (
    <>
      {/* Barra superior fija */}
      <FixedTopBarContainer>
        <TopBar title="Perfil" />
      </FixedTopBarContainer>

      <SettingsContainer>
        <AvatarContainer>
          <img src={profile_temp_image} alt="Avatar" style={{ width: '100%', borderRadius: '50%' }} />
        </AvatarContainer>

        <Username>Nombre de Usuario</Username>

        <SettingsList>
          <SettingsItem>
            <span>Tipo de cuenta</span>
            <span>→</span>
          </SettingsItem>
          <SettingsItem>
            <span>Nombre</span>
            <span>→</span>
          </SettingsItem>
          <SettingsItem>
            <span>Apellido(s)</span>
            <SmallLabel>Sólo para docentes y padres de familia</SmallLabel>
            <span>→</span>
          </SettingsItem>
          <SettingsItem>
            <span>Nombre de Usuario</span>
            <span>→</span>
          </SettingsItem>
          <SettingsItem>
            <span>Número de teléfono</span>
            <span>→</span>
          </SettingsItem>
        </SettingsList>

        {/* Botón de Cerrar sesión */}
        <LogoutButton onClick={onLogout}>Cerrar sesión</LogoutButton>
      </SettingsContainer>

      {/* Barra de navegación inferior fija */}
      <BottomNavBarContainer>
        <BottomNavBar onGameSelect={onGameSelect} />
      </BottomNavBarContainer>
    </>
  );
};

export default Settings;
