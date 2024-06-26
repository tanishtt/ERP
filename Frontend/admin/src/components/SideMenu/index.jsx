import React, { useContext } from 'react'; // Importing React and useContext hook
import { MdOutlineCancel } from 'react-icons/md'; // Importing an icon from react-icons
import { BsCheck } from 'react-icons/bs'; // Importing another icon from react-icons
import { TooltipComponent } from '@syncfusion/ej2-react-popups'; // Importing a tooltip component from Syncfusion
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import { useStateContext } from '../contexts/ContextProvider'; // Importing a custom hook from context provider

const SideMenu = () => {
  // Using the custom hook to get current mode, set color, set mode, set theme settings, and current color
  const navigate = useNavigate(); // Getting the navigate function for navigation
  const { currentMode, setColor, setMode, setThemeSettings, currentColor } = useStateContext();

  return (
    <div className={`SideMenu ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="SideMenuVertical">
        {/* Placeholder for your menu items */}
      </div>

      {/* Theme settings section */}
      <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
        <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-400">
          <div className="flex justify-between items-center p-4 ml-4">
            <p className="font-semibold text-lg">Settings</p>
            <button
              type="button"
              onClick={() => setThemeSettings(false)} // Close the settings panel
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel /> {/* Cancel icon */}
            </button>
          </div>
          <div className="flex-col border-t-1 border-color p-4 ml-4">
            <p className="font-semibold text-xl ">Theme Option</p>

            {/* Light theme option */}
            <div className="mt-4">
              <input
                type="radio"
                id="light"
                name="theme"
                value="Light"
                className="cursor-pointer"
                onChange={() => setMode('Light')} // Change theme to Light
                checked={currentMode === 'Light'} // Check if current mode is Light
              />
              <label htmlFor="light" className="ml-2 text-md cursor-pointer">
                Light
              </label>
            </div>

            {/* Dark theme option */}
            <div className="mt-2">
              <input
                type="radio"
                id="dark"
                name="theme"
                value="Dark"
                onChange={() => setMode('Dark')} // Change theme to Dark
                className="cursor-pointer"
                checked={currentMode === 'Dark'} // Check if current mode is Dark
              />
              <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
                Dark
              </label>
            </div>
          </div>

          {/* Theme colors section */}
          <div className="p-4 border-t-1 border-color ml-4">
            <p className="font-semibold text-xl ">Theme Colors</p>
            <div className="flex gap-3">
              {/* Iterate through themeColors array to create color buttons */}
              {themeColors.map((item, index) => (
                <TooltipComponent key={index} content={item.name} position="TopCenter">
                  <div
                    className="relative mt-2 cursor-pointer flex gap-5 items-center"
                    key={item.name}
                  >
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: item.color }}
                      onClick={() => setColor(item.color)} // Set the theme color
                    >
                      <BsCheck
                        className={`ml-2 text-2xl text-white ${
                          item.color === currentColor ? 'block' : 'hidden'
                        }`}
                      />
                    </button>
                  </div>
                </TooltipComponent>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
