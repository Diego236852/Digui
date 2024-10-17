import React, { useState } from "react";
import styled from "styled-components";
import AreYouSure from "./AreYouSure"; // Importamos el componente AreYouSure


// Styled Components
const WinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f0f4f8;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto; /* Ajusta el alto para evitar overflow en pantallas pequeñas */
  }
`;

const WinnerMessage = styled.h1`
  color: #6b21a8; /* Pantone 258C */
  margin-bottom: 40px;
  font-family: 'Baloo 2', cursive;
  font-size: 2.5rem; /* Ajuste del tamaño del texto */
  @media (max-width: 768px) {
    font-size: 2rem; /* Tamaño más pequeño para pantallas móviles */
    margin-bottom: 20px; /* Reduce el margen para pantallas móviles */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px; /* Limita el ancho máximo de los botones */

  @media (max-width: 768px) {
    gap: 15px; /* Reduce el espacio entre los botones para pantallas móviles */
  }
`;

const StyledButton = styled.button`
  padding: 15px 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: white;
  background-color: #d292bc; /* Pantone 673C */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #6b21a8; /* Pantone 258C */
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 20px;
  }
`;


// Componente para mostrar la pantalla de ganador
const DominoWinnerPage = ({ winner, onPlayAgain, onExitToMenu }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleExitClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelExit = () => {
    setShowConfirmation(false);
  };

  const handleConfirmExit = () => {
    setShowConfirmation(false);
    onExitToMenu(); // Llamamos a la función para salir al menú principal
  };

  return (
    <WinnerContainer>
      <WinnerMessage>
        {winner === "empate"
          ? "¡El juego ha terminado en empate!"
          : `¡Jugador ${winner} ganó el juego!`}
      </WinnerMessage>
      <ButtonContainer>
        <StyledButton onClick={onPlayAgain}>Jugar de nuevo</StyledButton>
        <StyledButton onClick={handleExitClick}>Volver al menú principal</StyledButton>
      </ButtonContainer>

      {showConfirmation && (
        <AreYouSure onConfirm={handleConfirmExit} onCancel={handleCancelExit} />
      )}
    </WinnerContainer>
  );
};


export default DominoWinnerPage;