import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import avatar1 from './../images/Settings/profile.jpeg'; // Reemplaza con la ruta correcta de la imagen
import avatar2 from './../images/Settings/profile.jpeg'; // Reemplaza con la ruta correcta de la imagen

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

const ChildSelector = ({ onChildSelected, onCreateChild }) => {
  const { user } = useAuth0();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axios.get("http://3.134.98.2:3000/database/getparentschildren", {
        params:{
          email_padre: 'josiasjsosas@gmail.com'
        }
      });
      return response.data;
    }
  })

  if (isLoading) return "Loading...";
  if (error) return "An error has ocurred: " + error.message;

  const handleChildClick = (child) => {
    onChildSelected(child); // Redirecciona a MainMenu pasando el niño seleccionado
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Digui</Title>
        {<ul>{data.data?.map((kid) => <li key={kid.id}>
        <ChildCard onClick={() => handleChildClick({ id: kid.id })}>
          <Avatar src={avatar1} alt="Avatar niño 1" />
          <ChildInfo>
            <ChildName>{kid.Nombre + ' ' + kid.Apellido}</ChildName>
            <StatusIndicator />
          </ChildInfo>
        </ChildCard>
        </li>)}</ul>}
        <CreateButton onClick={onCreateChild}>Crear niño</CreateButton>
      </Container>
    </>
  );
};

export default ChildSelector;