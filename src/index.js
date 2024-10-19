import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Importa BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain='dev-u0rsrro1n34wze1g.us.auth0.com'
    clientId='YrXjyjzAiNyebMZALeDxv4nNjSwCDWKV'
    authorizationParams={{
      redirect_uri: window.location.origin + '/Digui'
    }}
  >
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>  {/* Envuelve la aplicación con BrowserRouter */}
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </QueryClientProvider>
  </Auth0Provider>

);

reportWebVitals();
