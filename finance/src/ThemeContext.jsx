// ThemeContext.jsx
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';


// Create a Theme Context
const ThemeContext = createContext();

// Custom hook to use the Theme Context
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    const theme = {
        isDarkTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

// Prop type validation
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
