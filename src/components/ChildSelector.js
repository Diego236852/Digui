import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import avatar1 from './../images/Settings/profile.jpeg'; // Reemplaza con la ruta correcta de la imagen

import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  body {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3e5f5;
    user-select: none;
    overflow: hidden; /* Evita el scroll */
  }
`;

// Contenedor principal
const Container = styled.div`
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

const ChildCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    background-color: #f3f3f3;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ChildInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChildName = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #333;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-left: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  
  &:hover {
    background-color: #ff1a1a;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: white;
  color: #333;
  border: 2px solid #333;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ChildSelector = ({ onChildSelected, onCreateChild, onDeleteChild }) => {
  const { user } = useAuth0();

  // Realiza la consulta para obtener los hijos
  const { data, isLoading, error } = useQuery({
    queryKey: ["childrenData"],
    queryFn: async () => {
      const response = await axios.get("http://3.134.98.2:3000/database/getparentschildren", {
        params: {
          email_padre: user.email // Asegúrate de que sea dinámico según el email del padre
        }
      });
      return response.data;
    }
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  // Maneja el clic en el niño seleccionado
  const handleChildClick = (child) => {
    onChildSelected(child); // Pasa el objeto del niño completo
  };

  // Maneja la eliminación del niño
  const handleDeleteChild = (childId) => {
    onDeleteChild(childId); // Llama la función de eliminación con el ID del niño
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Digui</Title>
        {/* Muestra una lista de los hijos obtenidos desde la base de datos */}
        {data?.map((kid) => (
          <ChildCard key={kid.id}>
            <div onClick={() => handleChildClick(kid)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar src={avatar1} alt={`Avatar de ${kid.Nombre}`} />
              <ChildInfo>
                <ChildName>{`${kid.Nombre} ${kid.Apellido}`}</ChildName>
                <StatusIndicator />
              </ChildInfo>
            </div>
            <DeleteButton onClick={() => handleDeleteChild(kid.id)}>Eliminar</DeleteButton>
          </ChildCard>
        ))}
        <CreateButton onClick={onCreateChild}>Crear niño</CreateButton>
      </Container>
    </>
  );
};

export default ChildSelector;
