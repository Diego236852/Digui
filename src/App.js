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
import RuletaSuerte from './components/RuletaSuerte'; 
import Home from './components/Home'; 
import WordDecoder from './components/WordDecoder'; // Importamos el nuevo componente WordDecoder
import axios from 'axios'; // Importar axios para manejar las peticiones HTTP

// Se carga Auth0 para hacer uso del hook 'isAuthenticated' para verificar el estado de sesión del usuario
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');  
  const [difficulty, setDifficulty] = useState(null);  
  const [score, setScore] = useState(null);  
  //const [numberOfPlayers, setNumberOfPlayers] = useState(2); // Estado para almacenar el número de jugadores
  const [selectedChild, setSelectedChild] = useState(null); // Estado para el niño seleccionado
  const [isCreatingChild, setIsCreatingChild] = useState(false); // Nuevo estado para crear un niño

  const { isAuthenticated, logout, user } = useAuth0();

  useEffect(() => {
    // Si el usuario ya está autenticado, redirige directamente a LoginSuccessful
    if (isAuthenticated) {
      setCurrentScreen('loginSuccessful');
    } else {
      const timer = setTimeout(() => {
        setCurrentScreen('info');  
      }, 3000);  
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Función para eliminar un niño
  const handleDeleteChild = async (childId) => {
    try {
      await axios.post('http://3.134.98.2:3000/database/deletechild', {
        child_id: childId
      }); // Reemplaza con la URL correcta
      console.log(`Niño con ID ${childId} eliminado exitosamente`);
      setCurrentScreen('childSelector'); // Actualiza la pantalla para volver a ChildSelector
    } catch (error) {
      console.error("Error eliminando el niño:", error);
    }
  };

  // Manejadores de flujo de pantallas
  const handleFinishInfoDigui = () => {
    if (!isAuthenticated) setCurrentScreen('login');
    else setCurrentScreen('loginSuccessful');
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
    setIsCreatingChild(true); // Cambiamos a la pantalla de creación de niño
  };

  const handleChildCreated = (child) => {
    setSelectedChild(child);
    //setIsCreatingChild(false); // Después de crear el niño, volvemos al menú principal
    setCurrentScreen('mainMenu');
  };

  const handleCancelCreateChild = () => {
    setIsCreatingChild(false); // Cancelar la creación de niño y regresar al selector
    setCurrentScreen('childSelector');
  };

  // Manejador para seleccionar el juego
  const handleGameSelect = (game) => {
    if (game === 'ABC Piensa') {
      setCurrentScreen('difficultyMenu');  
    } else if (game === 'Domino') {
      setCurrentScreen('domino');  
    } else if (game === 'RuletaSuerte') {
      setCurrentScreen('ruletaSuerte');  
    } else if (game === 'WordDecoder') {
      setCurrentScreen('wordDecoder');  
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
    logout({ logoutParams: { returnTo: window.location.origin + '/Digui' } });
  };

  // Manejador para la selección de la opción "Inicio" en la barra de navegación
  const handleHomeSelect = () => {
    setCurrentScreen('home');
  };

  const handleEducationSelect = () => {
    console.log('Educación seleccionada');
  };

  const handleNotificationsSelect = () => {
    console.log('Notificaciones seleccionadas');
  };

  const handleChangeChild = () => {
    setCurrentScreen('childSelector'); // Permite cambiar el niño seleccionado
  };

  return (
    <>
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'info' && <InfoDigui onFinish={handleFinishInfoDigui} />}
      {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === 'loginSuccessful' && <LoginSuccessful onContinue={handleLoginAnimationEnd} />}
      
      {currentScreen === 'childSelector' && !isCreatingChild && (
        <ChildSelector 
          onChildSelected={handleChildSelected} 
          onCreateChild={handleCreateChildClick}
          onDeleteChild={handleDeleteChild} // Pasamos la función de eliminar al ChildSelector
          onLogout={handleLogout}
        />
      )}
      
      {isCreatingChild && (
        <CreateChildForm onChildCreated={handleChildCreated} onCancel={handleCancelCreateChild} />
      )}
      
      {currentScreen === 'mainMenu' && (
        <MainMenu
          onGameSelect={handleGameSelect}
          onSettingsSelect={handleSettingsSelect}
          onHomeSelect={handleHomeSelect}
        />
      )}
      
      {currentScreen === 'settings' && (
        <Settings
          selectedChild={selectedChild}  
          parentEmail={user?.email}     
          onBack={handleBackFromSettings}
          onGameSelect={handleExitToMenu}
          onLogout={handleLogout}
          onHomeSelect={handleHomeSelect}
          onChangeChild={handleChangeChild}
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

      {currentScreen === 'domino' && <Domino onExitToMenu={handleExitToMenu} />}

      {currentScreen === 'ruletaSuerte' && <RuletaSuerte onExitToMenu={handleExitToMenu} />}

      {currentScreen === 'wordDecoder' && <WordDecoder onExitToMenu={handleExitToMenu} />}

      {currentScreen === 'home' && (
        <Home 
          onGameSelect={() => setCurrentScreen('mainMenu')}
          onEducationSelect={handleEducationSelect}
          onHomeSelect={handleHomeSelect}
          onSettingsSelect={handleSettingsSelect}
          onNotificationsSelect={handleNotificationsSelect}
        />
      )}
    </>
  );
}

export default App;
