
import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import useDebounce from './hooks/useDebounce';
import { LanguageProvider } from './LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import AppTitle from './components/AppTitle'; // FIX: Import AppTitle

// Only export ThemeContext here; LanguageContext is provided by LanguageProvider
export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  return (
    <LanguageProvider>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <div className={`app-root ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}>
          <div className="shop-container">
            <header className="shop-header">
              <AppTitle />
              <div className="shop-controls">
                <ThemeToggle />
                <LanguageSelector />
              </div>
            </header>
            <main>
              <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <ProductList search={debouncedSearchTerm} />
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
};

export default App;
