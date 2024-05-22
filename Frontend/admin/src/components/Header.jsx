import React from 'react'; // Importing React to use JSX and React components

// Defining the Header functional component with props `category` and `title`
const Header = ({ category, title }) => (
  <div className="mb-10"> // Main container div with a bottom margin
    <p className="text-lg text-gray-400">
      {category} // Displays the category passed as a prop, styled in light gray
    </p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title} // Displays the title passed as a prop, styled as extra bold and dark
    </p>
  </div>
);

export default Header; // Exporting the Header component as the default export
