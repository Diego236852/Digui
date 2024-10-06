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


function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');  
  const [difficulty, setDifficulty] = useState(null);  
  const [score, setScore] = useState(null);  

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('info');  
    }, 3000);  

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'info' && <InfoDigui onFinish={handleFinishInfoDigui} />}
      {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === 'loginSuccessful' && <LoginSuccessful onContinue={handleLoginAnimationEnd} />}
      {currentScreen === 'mainMenu' && <MainMenu onGameSelect={handleGameSelect} />}
      {currentScreen === 'difficultyMenu' && <ABCdifficultyMenu onSelectDifficulty={handleSelectDifficulty} onBack={handleExitToMenu} />}
      {currentScreen === 'game' && <ABCPiensa difficulty={difficulty} onGameEnd={handleGameEnd} onGameLost={handleGameLost} onExitToMenu={handleExitToMenu} />}
      {currentScreen === 'winner' && <ABCwinnerMenu score={score} onRestart={handleRestartGame} onExitToMenu={handleExitToMenu} />}
      {currentScreen === 'gameover' && <ABCloserMenu onRetry={handleRestartGame} />} {/* Pasamos handleRestartGame aquí */}
    </>
  );
}

export default App;
