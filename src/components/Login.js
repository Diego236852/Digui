import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import googleLogo from './../images/Login/google-logo.svg'; // Imagen del logo de Google
import logo from './../images/Login/logo digui.svg'; // Logo de digui


// Agregar las fuentes de Google Fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  body {
    font-family: 'Quicksand', sans-serif;
  }
`;

// Animaciones para deslizar hacia la derecha
const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Animación para deslizar hacia la izquierda
const slideOutLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

// Animación para deslizar hacia la izquierda
const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Animación para deslizar hacia la derecha
const slideOutRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

// Animación de flotación para las formas geométricas
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Contenedor principal que divide la pantalla en dos
const Background = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e5f5, #ffffff);
  padding: 0 60px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    justify-content: center;
  }
`;

// Formas geométricas en colores pastel
const GeometricShape = styled.div`
  position: absolute;
  background: ${(props) => props.color};
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : '0')};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 5s ease-in-out infinite;
`;

// Contenedor principal con flexbox para alinear el texto y el formulario
const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-right: 50px;
  padding-left: 100px;
  animation: ${slideInRight} 1s ease-out;

  @media (max-width: 768px) {
    padding-right: 0;
    padding-left: 0;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const LargeText = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 48px;
  color: #6b21a8;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SubText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Caja de login/registro
const LoginBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 50px;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 90%;
    margin-right: 0;
    padding: 20px;
  }

  &.slide-in-left {
    animation: ${slideInLeft} 0.5s forwards;
  }

  &.slide-out-left {
    animation: ${slideOutLeft} 0.5s forwards;
  }

  &.slide-in-right {
    animation: ${slideInRight} 0.5s forwards;
  }

  &.slide-out-right {
    animation: ${slideOutRight} 0.5s forwards;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const Input = styled.input`
  font-family: 'Quicksand', sans-serif;
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #6b21a8;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 15px;
  background-color: #6b21a8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:hover {
    background-color: #5a189a;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Link = styled.a`
  font-family: 'Poppins', sans-serif;
  color: #6b21a8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CreateAccountButton = styled(Button)`
  background-color: white;
  color: #6b21a8;
  border: 1px solid #6b21a8;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const GoogleButton = styled.button`
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  background-color: #ea4335;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;

  img {
    margin-right: 10px;
  }

  &:hover {
    background-color: #d93c30;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  margin-left: 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCreateAccount = () => {
    setAnimation('slide-out-right');
    setTimeout(() => {
      setIsLogin(false);
      setAnimation('slide-in-left');
    }, 500);
  };

  const handleBackToLogin = () => {
    setAnimation('slide-out-left');
    setTimeout(() => {
      setIsLogin(true);
      setAnimation('slide-in-right');
    }, 500);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleLoginClick = () => {
    onLoginSuccess();  // Cambia la pantalla a LoginSuccess (controlado por App)
  };

  return (
    <>
      <GlobalStyle />
      <Background>
        {/* Formas geométricas */}
        <GeometricShape shape="circle" color="#B3E5FC" size="150px" top="10%" left="5%" />
        <GeometricShape shape="square" color="#FFCDD2" size="120px" bottom="10%" right="10%" />
        <GeometricShape shape="circle" color="#C5CAE9" size="180px" bottom="20%" left="15%" />
        
        <Content>
          <TextContainer>
            <LargeText>Bienvenido a DIGUI</LargeText>
            <SubText>
              La plataforma educativa diseñada para niños, donde aprender y jugar se unen.
            </SubText>
          </TextContainer>

          <LoginBox className={animation}>
            <Logo src={logo} alt="Logo DIGUI" />

            {isLogin ? (
              <>
                <Input type="text" placeholder="Usuario" />
                <Input type="password" placeholder="Contraseña" />
                <Button onClick={handleLoginClick}>Iniciar Sesión</Button>
                <Link>¿Olvidaste la contraseña?</Link>
                <CreateAccountButton onClick={handleCreateAccount}>
                  Crear Cuenta
                </CreateAccountButton>
                <p>O iniciar sesión con</p>
                <GoogleButton>
                  <img src={googleLogo} alt="Google" width="20" />
                  Google
                </GoogleButton>
              </>
            ) : (
              <>
                <Input type="text" placeholder="Nombre completo" />
                <Input type="email" placeholder="Correo electrónico" />
                <Input type="password" placeholder="Contraseña" />
                
                {/* Checkbox de términos y condiciones */}
                <CheckboxContainer>
                  <Checkbox
                    id="terms"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxLabel htmlFor="terms">
                    Acepto los <a href='#'>términos y condiciones</a>
                  </CheckboxLabel>
                </CheckboxContainer>

                <Button disabled={!isChecked}>Registrar</Button>
                <Button onClick={handleBackToLogin}>Volver al Login</Button>
              </>
            )}
          </LoginBox>
        </Content>
      </Background>
    </>
  );
};

export default Login;
