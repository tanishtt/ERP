import React from 'react'; // Importing React
import { useStateContext } from '../contexts/ContextProvider'; // Importing a custom hook from the context provider

// Defining a functional component named Button
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  // Using the custom hook to get context values and functions
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      // When the button is clicked, setIsClicked is called with initialState to reset the clicked state
      onClick={() => setIsClicked(initialState)}
      // Applying inline styles for background color, text color, and border radius
      style={{ backgroundColor: bgColor, color, borderRadius }}
      // Applying Tailwind CSS classes for text size, padding, width, hover effects, and shadow
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text} {/* Rendering the icon and text props passed to the Button component */}
    </button>
  );
};

export default Button; // Exporting the Button component as the default export
