import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

/**
 * Componente que permite cambiar entre modo claro y oscuro.
 * Guarda la preferencia en el localStorage para que persista.
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <Button 
      variant="link"
      onClick={toggleTheme}
      className="theme-toggle-btn nav-link d-flex align-items-center justify-content-center p-2"
      style={{ 
        width: '40px', 
        height: '40px', 
        fontSize: '1.2rem',
        color: 'inherit' 
      }}
      title={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === 'dark' ? (
        <i className="bi bi-sun-fill text-warning"></i>
      ) : (
        <i className="bi bi-moon-stars-fill text-primary"></i>
      )}
    </Button>
  );
};

export default ThemeToggle;