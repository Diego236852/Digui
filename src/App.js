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
import Settings from './components/Settings'; 
import Domino from './components/Domino'; // Importa tu juego de dominó

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');  
  const [difficulty, setDifficulty] = useState(null);  
  const [score, setScore] = useState(null);  
  const [numberOfPlayers, setNumberOfPlayers] = useState(2); // Estado para almacenar el número de jugadores

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
      setCurrentScreen('domino');  // Cambia a la pantalla del juego de Dominó
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
    setCurrentScreen('difficultyMenu');  // Aquí redirigimos al menú de dificultad
  };

  const handleExitToMenu = () => {
    setCurrentScreen('mainMenu');  
  };

  const handleSettingsSelect = () => {
    setCurrentScreen('settings');  
  };

  const handleBackFromSettings = () => {
    setCurrentScreen('mainMenu');  
  };

  const handleLogout = () => {
    setCurrentScreen('login');  
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
          onSettingsSelect={handleSettingsSelect}
        />
      )}
      {currentScreen === 'settings' && (
        <Settings
          onBack={handleBackFromSettings}
          onGameSelect={handleExitToMenu}
          onLogout={handleLogout}
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
      
      {/* Pantalla del juego de Dominó */}
      {currentScreen === 'domino' && <Domino onExitToMenu={handleExitToMenu} />} {/* Renderizamos el componente del juego de dominó */}
    </>
  );
}

export default App;
