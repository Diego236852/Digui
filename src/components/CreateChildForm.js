import React, { useState } from 'react';
import styled from 'styled-components';


// Contenedor principal
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const Input = styled.input`
  font-family: 'Quicksand', sans-serif;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #6b21a8;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: #6b21a8;
  color: white;
  border: none;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 20px;

  &:hover {
    background-color: #5a189a;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: #6b21a8;
  border: 2px solid #6b21a8;

  &:hover {
    background-color: #f3f3f3;
  }
`;


const CreateChildForm = ({ onChildCreated, onCancel }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = () => {
    if (name && lastName) {
      const newChild = { name, lastName };
      onChildCreated(newChild); // Regresar el nuevo niño al componente principal
    }
  };

  return (
    <FormContainer>
      <Title>Crear Niño</Title>
      <Input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button onClick={handleSubmit}>Crear</Button>
      <CancelButton onClick={onCancel}>Regresar</CancelButton>
    </FormContainer>
  );
};


export default CreateChildForm;