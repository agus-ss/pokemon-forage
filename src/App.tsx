import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import PokemonDetails from './components/PokemonDetails';

// A TypeScript type that defines the structure of the authentication context.
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

// A context that provides the isAuthenticated state and a function to update it. This context will be used to manage the authentication state throughout the application.
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const App: React.FC = () => {
  // useState: Initializes isAuthenticated based on the value stored in localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') === 'true');

  // useEffect: A hook that adds an event listener to the storage event, which triggers when the localStorage changes. It updates isAuthenticated accordingly.
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('auth') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    // cleanup: Removes the event listener when the component unmounts to avoid memory leaks.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Provides the isAuthenticated state and the setIsAuthenticated function to the rest of the application.
  return (
    <div className='bg-black min-h-screen'>
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/pokemon/:name" element={isAuthenticated ? <PokemonDetails /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
    </div>
  );
};

export default App;
