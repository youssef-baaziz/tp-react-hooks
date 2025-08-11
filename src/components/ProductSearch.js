import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../LanguageContext';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useLanguage();

  // Local state for input value, initialized from searchTerm
  const [inpVal, setInpVal] = useState(searchTerm);

  // Update local input value if parent searchTerm changes
  useEffect(() => {
    setInpVal(searchTerm);
  }, [searchTerm]);

  // Debounce the input value
  const debouncedValue = useDebounce(inpVal, 500);

  // Update parent searchTerm when debounced value changes
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  const placeholder = language === 'fr' ? "Rechercher un produit..." : "Search for a product...";

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder={placeholder}
        className={`form-control ${isDarkTheme ? 'dark-theme-input bg-dark text-white' : 'light-theme-input'}`}
        style={{
          backgroundColor: isDarkTheme ? '#181824' : '#fff',
          color: isDarkTheme ? '#f5f5f5' : '#181824',
          borderColor: isDarkTheme ? '#444' : '#ccc'
        }}
      />
      <style>{`
        .light-theme-input::placeholder {
          color: #888;
        }
        .dark-theme-input::placeholder {
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default ProductSearch;