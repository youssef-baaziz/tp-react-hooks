import { useContext } from 'react';
import { ThemeContext } from '../App';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      aria-pressed={isDarkTheme}
      onClick={() => setIsDarkTheme((prev) => !prev)}
      style={{
        padding: '0.5rem 1.5rem',
        borderRadius: '8px',
        border: `1.5px solid ${isDarkTheme ? '#f5f5f5' : '#181824'}`,
        background: isDarkTheme ? '#181824' : '#f5f5f5',
        color: isDarkTheme ? '#f5f5f5' : '#181824',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s, border 0.2s'
      }}
      title={isDarkTheme ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {isDarkTheme ? (
        <>
          <span role="img" aria-label="Soleil" style={{ marginRight: 8 }}>🌞</span>
          Mode Clair
        </>
      ) : (
        <>
          <span role="img" aria-label="Lune" style={{ marginRight: 8 }}>🌙</span>
          Mode Sombre
        </>
      )}
    </button>
  );
};

export default ThemeToggle;