import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Oscurece el fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${({ variant }) =>
    variant === 'confirm'
      ? `
    background-color: #ff4d4d;
    color: white;

    &:hover {
      background-color: #ff1a1a;
    }
  `
      : `
    background-color: #ccc;

    &:hover {
      background-color: #aaa;
    }
  `}
`;

const AysDelete = ({ onConfirm, onCancel }) => {
  return (
    <Overlay>
      <Modal>
        <Title>¿Estás seguro de eliminar este niño?</Title>
        <ButtonsContainer>
          <Button variant="confirm" onClick={onConfirm}>Sí</Button>
          <Button variant="cancel" onClick={onCancel}>No</Button>
        </ButtonsContainer>
      </Modal>
    </Overlay>
  );
};

export default AysDelete;
