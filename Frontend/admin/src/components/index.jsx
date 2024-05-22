// Exporting components from their respective files

export { default as Button } from './Button'; // Exporting the Button component from Button.js
export { default as ThemeSettings } from './ThemeSettings'; // Exporting the ThemeSettings component from ThemeSettings.js
export { default as Sidebar } from './Sidebar'; // Exporting the Sidebar component from Sidebar.js

// Importing the Navbar component to avoid circular dependencies and then exporting it
// eslint-disable-next-line import/no-cycle
export { default as Navbar } from './Navbar'; // Exporting the Navbar component from Navbar.js

export { default as Footer } from './Footer'; // Exporting the Footer component from Footer.js
export { default as Cart } from './Cart'; // Exporting the Cart component from Cart.js
export { default as Chat } from './Chat'; // Exporting the Chat component from Chat.js
export { default as Notification } from './Notification'; // Exporting the Notification component from Notification.js
export { default as UserProfile } from './UserProfile'; // Exporting the UserProfile component from UserProfile.js

// Exporting chart components from their respective folders

export { default as SparkLine } from './Charts/SparkLine'; // Exporting the SparkLine component from Charts/SparkLine.js
export { default as LineChart } from './Charts/LineChart'; // Exporting the LineChart component from Charts/LineChart.js
export { default as Stacked } from './Charts/Stacked'; // Exporting the Stacked component from Charts/Stacked.js
export { default as Pie } from './Charts/Pie'; // Exporting the Pie component from Charts/Pie.js
export { default as ChartsHeader } from './ChartsHeader'; // Exporting the ChartsHeader component from ChartsHeader.js
export { default as Header } from './Header'; // Exporting the Header component from Header.js
