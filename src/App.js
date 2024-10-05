import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import InfoDigui from './InfoDigui';
import Login from './Login';
import ABCdifficultyMenu from './ABCdifficultyMenu';
import ABCPiensa from './ABCPiensa';
import ABCwinnerMenu from './ABCwinnerMenu';
import ABCloser from './ABCloser';
import LoginSuccessful from './LoginSuccessful'; // Agrega esta línea

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // Maneja pantallas intermedias con estado
  const [difficulty, setDifficulty] = useState(null);  // Dificultad seleccionada
  const [score, setScore] = useState(null);  // Puntuación final

  // Manejo de SplashScreen y InfoDigui
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('info');  // Cambia a InfoDigui después del SplashScreen
    }, 3000);  // 3 segundos de splash

    return () => clearTimeout(timer);  // Limpiamos el temporizador
  }, []);

  const handleFinishInfoDigui = () => {
    setCurrentScreen('login');  // Cambia a la pantalla de login
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('loginSuccessful');  // Cambia a la pantalla de éxito después del login
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('game');  // Cambia a la pantalla del juego
  };

  const handleGameEnd = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('winner');  // Cambia al menú de ganador
  };

  const handleGameLost = () => {
    setCurrentScreen('gameover');  // Cambia a la pantalla de perdedor
  };

  const handleRestart = () => {
    setDifficulty(null);
    setScore(null);
    setCurrentScreen('ABCdifficultyMenu');  // Vuelve al menú de selección de dificultad
  };

  // Renderizado de pantallas basado en el estado actual
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'info':
      return <InfoDigui onFinish={handleFinishInfoDigui} />;
    case 'login':
      return <Login onLoginSuccess={handleLoginSuccess} />;
    case 'loginSuccessful':
      return <LoginSuccessful />;
    case 'ABCdifficultyMenu':
      return <ABCdifficultyMenu onSelectDifficulty={handleSelectDifficulty} />;
    case 'game':
      return <ABCPiensa difficulty={difficulty} onGameEnd={handleGameEnd} onGameLost={handleGameLost} />;
    case 'winner':
      return <ABCwinnerMenu score={score} onRestart={handleRestart} />;
    case 'gameover':
      return <ABCloser onRetry={handleRestart} />;
    default:
      return null;
  }
}

export default App;
