import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6b21a8, #f3e5f5);
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #6b21a8;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background: linear-gradient(135deg, #6b21a8, #5a189a);
  color: white;
  border: none;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #5a189a;
    transform: scale(1.05);
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: white;
  border: 2px solid #6b21a8;

  &:hover {
    background-color: #f3f3f3;
    transform: scale(1.02);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

const CreateChildForm = ({ onChildCreated, onCancel }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth0();

  const handleSubmit = () => {
    if (!name || !lastName) {
      setErrorMessage('Por favor, rellena ambos campos.');
      return;
    }

    axios.post('http://3.134.98.2:3000/database/addchild', {
      email_padre: user.email,
      nombre: name,
      apellido: lastName
    })
    .then(() => {
      onChildCreated(); // Llama la función de éxito
    })
    .catch((err) => {
      setErrorMessage('Error al crear el niño. Inténtalo de nuevo.');
      console.log(err);
    });
  };

  return (
    <FormContainer>
      <Title>Crear Niño</Title>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

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
