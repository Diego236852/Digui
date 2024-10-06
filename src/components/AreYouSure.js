import React from 'react';
import styled from 'styled-components';


// Estilo para el fondo oscuro y transparente
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);  /* Fondo oscuro transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;  /* Asegurarse que esté superpuesto */
`;

// Estilo para la ventana modal
const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 80%;
  margin: 0 auto; /* Asegurar que esté centrado horizontalmente */
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    width: 300px; /* Ajuste para pantallas más pequeñas */
  }

  @media (orientation: portrait) {
    padding: 15px;
    width: 280px; /* Ajuste específico para pantallas verticales */
  }
`;

// Estilo del texto de confirmación
const Message = styled.p`
  font-family: 'Baloo 2', cursive;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px; /* Texto más pequeño en pantallas pequeñas */
  }

  @media (orientation: portrait) {
    font-size: 20px; /* Texto más pequeño en pantallas verticales */
    margin-bottom: 15px;
  }
`;

// Contenedor para los botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%; /* Asegurar que los botones estén alineados con el tamaño del modal */
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (orientation: portrait) {
    margin-top: 10px;
    flex-direction: column; /* Colocar los botones en columna en pantallas verticales */
    align-items: center;
  }
`;

// Botón estilo
const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#6b21a8' : '#ccc')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#5a189a' : '#999')};
  }

  @media (max-width: 768px) {
    padding: 8px 18px; /* Botones más pequeños en pantallas pequeñas */
    font-size: 16px;
  }

  @media (orientation: portrait) {
    width: 100%; /* Botones a pantalla completa en orientación vertical */
    margin-bottom: 10px; /* Espacio entre los botones cuando están en columna */
  }
`;


const AreYouSure = ({ onConfirm, onCancel }) => {
  return (
    <Overlay>
      <ModalContainer>
        <Message>¿Estás seguro de que quieres salir?</Message>
        <ButtonContainer>
          <Button primary onClick={onConfirm}>Sí</Button>
          <Button onClick={onCancel}>No</Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};


export default AreYouSure;
