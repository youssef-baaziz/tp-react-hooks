import React, { useContext } from 'react';
import { useLanguage } from '../LanguageContext';
import { ThemeContext } from '../App';

const LanguageSelector = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const { language, changeLanguage } = useLanguage();
    return (
        <select
            className={`lang-select ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{
                backgroundColor: isDarkTheme ? '#181824' : '#f5f5f5',
                color: isDarkTheme ? '#f5f5f5' : '#181824',
                borderColor: isDarkTheme ? '#444' : '#ccc',
                minWidth: 120,
                fontWeight: 500
            }}
        >
            <option value="fr">Français</option>
            <option value="en">English</option>
        </select>
    );
};

export default LanguageSelector;