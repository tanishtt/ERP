import React from 'react'; // Importing React

// Defining the ChartsHeader functional component which takes 'category' and 'title' as props
const ChartsHeader = ({ category, title }) => (
  <div className="mb-10">
    {/* Main container with bottom margin */}
    <div>
      {/* Static text indicating it's a chart */}
      <p className="text-lg text-gray-400">Chart</p>
      {/* Dynamic category text with different styling for light and dark modes */}
      <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">{category}</p>
    </div>
    {/* Dynamic title text with center alignment, dark mode styling, and top/bottom margins */}
    <p className="text-center dark:text-gray-200 text-xl mb-2 mt-3">{title}</p>
  </div>
);

export default ChartsHeader; // Exporting ChartsHeader component as default export
