import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import InfoDigui from './InfoDigui';  // Pantalla con las páginas de DIGUI
import Login from './Login';  // Ventana de inicio de sesión

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  useEffect(() => {
    // Simulamos un tiempo de espera para la pantalla de splash
    const timer = setTimeout(() => {
      setCurrentScreen('info');
    }, 3000); // 3 segundos de splash, ajusta este tiempo si lo necesitas

    return () => clearTimeout(timer); // Limpiamos el timer cuando se desmonte el componente
  }, []);

  const handleFinishInfoDigui = () => {
    // Cuando el usuario ha pasado por todas las páginas de InfoDigui, se muestra la ventana de inicio de sesión
    setCurrentScreen('login');
  };

  return (
    <div className="App">
      {/* Condicional para mostrar la pantalla según el estado */}
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'info' && <InfoDigui onFinish={handleFinishInfoDigui} />}
      {currentScreen === 'login' && <Login />}
    </div>
  );
}

export default App;
