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
import Domino from './components/Domino';
import ChildSelector from './components/ChildSelector'; 
import CreateChildForm from './components/CreateChildForm'; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');  
  const [difficulty, setDifficulty] = useState(null);  
  const [score, setScore] = useState(null);  
  const [selectedChild, setSelectedChild] = useState(null); 
  const [isCreatingChild, setIsCreatingChild] = useState(false); 

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
    setCurrentScreen('childSelector');  
  };

  const handleChildSelected = (child) => {
    setSelectedChild(child);
    setCurrentScreen('mainMenu');  
  };

  const handleCreateChildClick = () => {
    setIsCreatingChild(true); 
  };

  const handleChildCreated = (child) => {
    setSelectedChild(child);
    setIsCreatingChild(false); 
    setCurrentScreen('mainMenu');
  };

  const handleCancelCreateChild = () => {
    setIsCreatingChild(false); 
    setCurrentScreen('childSelector');
  };

  const handleGameSelect = (game) => {
    if (game === 'ABC Piensa') {
      setCurrentScreen('difficultyMenu');  
    } else if (game === 'Domino') {
      setCurrentScreen('domino');  
    }
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('game');  
  };

  const handleGameEnd = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('winner');  
  };

  const handleGameLost = () => {
    setCurrentScreen('gameover');  
  };

  const handleRestartGame = () => {
    setCurrentScreen('difficultyMenu');  
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
      
      {currentScreen === 'childSelector' && !isCreatingChild && (
        <ChildSelector onChildSelected={handleChildSelected} onCreateChild={handleCreateChildClick} />
      )}
      
      {isCreatingChild && (
        <CreateChildForm onChildCreated={handleChildCreated} onCancel={handleCancelCreateChild} />
      )}
      
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
