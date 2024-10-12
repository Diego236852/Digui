import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import InfoDigui from './components/InfoDigui';
import Login from './components/Login';
import LoginSuccessful from './components/LoginSuccessful';  
import MainMenu from './components/MainMenu';  
import ABCdifficultyMenu from './components/ABCdifficultyMenu';
import ABCPiensa from './components/ABCPiensa';
import ABCwinnerMenu from './components/ABCwinnerMenu';
import ABCloserMenu from './components/ABCloserMenu';
import Settings from './components/Settings'; // Importa el componente Settings
import Domino from './components/Domino'; // Importa el componente Domino
import DominoGameModeSelector from './components/DominoGameModeSelector'; // Importa el selector de modo de juego de Domino

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');  
  const [difficulty, setDifficulty] = useState(null);  
  const [score, setScore] = useState(null);  

  // Controlar el tiempo de espera en SplashScreen
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('info');  
    }, 3000);  

    return () => clearTimeout(timer);
  }, []);

  // Manejadores de flujo de pantallas
  const handleFinishInfoDigui = () => {
    setCurrentScreen('login');  
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('loginSuccessful');  
  };

  const handleLoginAnimationEnd = () => {
    setCurrentScreen('mainMenu');  
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('game');  
  };

  const handleGameSelect = (game) => {
    if (game === 'ABC Piensa') {
      setCurrentScreen('difficultyMenu');  
    } else if (game === 'Domino') {
      setCurrentScreen('dominoModeSelector');  // Abre la selección de modo de juego de Dominó
    }
  };

  const handleGameEnd = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('winner');  
  };

  const handleGameLost = () => {
    setCurrentScreen('gameover');  
  };

  const handleRestartGame = () => {
    setCurrentScreen('difficultyMenu');  // Redirigimos al menú de dificultad
  };

  const handleExitToMenu = () => {
    setCurrentScreen('mainMenu');  
  };

  // Manejador para la pantalla de ajustes
  const handleSettingsSelect = () => {
    setCurrentScreen('settings');  // Cambia a la pantalla de ajustes
  };

  const handleBackFromSettings = () => {
    setCurrentScreen('mainMenu');  // Volvemos al menú principal desde ajustes
  };

  // Manejador para cerrar sesión
  const handleLogout = () => {
    setCurrentScreen('login');  // Redirigimos a la pantalla de inicio de sesión
  };

  return (
    <>
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'info' && <InfoDigui onFinish={handleFinishInfoDigui} />}
      {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === 'loginSuccessful' && <LoginSuccessful onContinue={handleLoginAnimationEnd} />}
      {currentScreen === 'mainMenu' && (
        <MainMenu
          onGameSelect={handleGameSelect}
          onSettingsSelect={handleSettingsSelect}  // Pasamos handleSettingsSelect al MainMenu
        />
      )}
      {currentScreen === 'settings' && (
        <Settings
          onBack={handleBackFromSettings}
          onGameSelect={handleExitToMenu}  // Pasamos handleExitToMenu para volver a juegos
          onLogout={handleLogout}  // Añadimos la función de logout
        />
      )}
      {currentScreen === 'difficultyMenu' && (
        <ABCdifficultyMenu
          onSelectDifficulty={handleSelectDifficulty}
          onBack={handleExitToMenu}
        />
      )}
      {currentScreen === 'game' && (
        <ABCPiensa
          difficulty={difficulty}
          onGameEnd={handleGameEnd}
          onGameLost={handleGameLost}
          onExitToMenu={handleExitToMenu}
        />
      )}
      {currentScreen === 'winner' && (
        <ABCwinnerMenu
          score={score}
          onRestart={handleRestartGame}
          onExitToMenu={handleExitToMenu}
        />
      )}
      {currentScreen === 'gameover' && <ABCloserMenu onRetry={handleRestartGame} />}
      {currentScreen === 'dominoModeSelector' && (
        <DominoGameModeSelector onBack={handleExitToMenu} />  // Selector de modo de juego de Dominó
      )}
      {currentScreen === 'domino' && <Domino />}  {/* Renderiza el juego de Dominó */}
    </>
  );
}

export default App;
