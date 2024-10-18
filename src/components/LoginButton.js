import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

// Estilo para el botón de iniciar sesión
const StyledButton = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 15px;
  background-color: #6b21a8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #5a189a;
    box-shadow: 0px 4px 15px rgba(107, 33, 168, 0.6);
  }

  &:active {
    background-color: #4b158a;
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 16px;
  }
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyledButton onClick={() => loginWithRedirect()}>
      Unete a nosotros
    </StyledButton>
  );
};

export default LoginButton;
