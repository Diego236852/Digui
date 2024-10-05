import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import InfoDigui from './InfoDigui';
import Login from './Login';
import ABCdifficultyMenu from './ABCdifficultyMenu';
import ABCPiensa from './ABCPiensa';
import ABCwinnerMenu from './ABCwinnerMenu';
import ABCloserMenu from './ABCloserMenu';  
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // Maneja pantallas intermedias con estado
  const [difficulty, setDifficulty] = useState(null);  // Dificultad seleccionada
  const [score, setScore] = useState(null);  // Puntuación final
  const navigate = useNavigate();  // Hook para navegación de rutas

  // Manejo de SplashScreen y InfoDigui
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('info');  // Cambia a InfoDigui después del SplashScreen
    }, 3000);  // 3 segundos de splash

    return () => clearTimeout(timer);  // Limpiamos el temporizador
  }, []);

  const handleFinishInfoDigui = () => {
    setCurrentScreen('login');  // Navega a la pantalla de login
  };

  const handleLoginSuccess = () => {
    navigate('/ABCdifficultyMenu');  // Cambia a selección de dificultad
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    navigate('/game');  // Navega al juego
  };

  const handleGameEnd = (finalScore) => {
    setScore(finalScore);
    navigate('/winner');  // Navega al menú de ganador
  };

  const handleGameLost = () => {
    navigate('/gameover');  // Navega a la pantalla de perdedor
  };

  // Manejo condicional para pantallas intermedias
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'info') {
    return <InfoDigui onFinish={handleFinishInfoDigui} />;
  }

  if (currentScreen === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Una vez que superamos pantallas intermedias, usamos rutas
  return (
    <div className="App">
      <Routes>
        <Route path="/ABCdifficultyMenu" element={<ABCdifficultyMenu onSelectDifficulty={handleSelectDifficulty} />} />
        <Route path="/game" element={<ABCPiensa difficulty={difficulty} onGameEnd={handleGameEnd} onGameLost={handleGameLost} />} />
        <Route path="/winner" element={<ABCwinnerMenu score={score} />} />
        <Route path="/gameover" element={<ABCloserMenu />} />
      </Routes>
    </div>
  );
}

export default App;
