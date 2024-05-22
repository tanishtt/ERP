import React, { createContext, useContext, useState } from 'react';

// Create a context for managing state
const StateContext = createContext();

// Initial state for the application
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// ContextProvider component to provide state and handlers to the entire application
export const ContextProvider = ({ children }) => {
  // State to manage the screen size
  const [screenSize, setScreenSize] = useState(undefined);
  
  // State to manage the current theme color
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  
  // State to manage the current theme mode (Light/Dark)
  const [currentMode, setCurrentMode] = useState('Light');
  
  // State to manage the visibility of theme settings
  const [themeSettings, setThemeSettings] = useState(false);
  
  // State to manage whether the menu is active or not
  const [activeMenu, setActiveMenu] = useState(true);
  
  // State to manage the visibility of different sections (chat, cart, userProfile, notification)
  const [isClicked, setIsClicked] = useState(initialState);

  // Function to set the theme mode (Light/Dark) and store it in localStorage
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  // Function to set the theme color and store it in localStorage
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  // Function to handle clicks on different sections and set their state to true
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // Providing the context values to the entire application
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      handleClick,
      isClicked,
      initialState,
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      setMode,
      setColor,
      themeSettings,
      setThemeSettings
    }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context in other components
export const useStateContext = () => useContext(StateContext);
