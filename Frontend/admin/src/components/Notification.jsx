import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

// Notification component to display notifications
const Notification = () => {
  // Accessing current color from context for consistent theme colors
  const { currentColor } = useStateContext();

  return (
    // Main container for the notifications, styled based on theme
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      {/* Header section with title and close button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
          {/* New notifications indicator */}
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme ">5 New</button>
        </div>
        {/* Close button for the notification panel */}
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>

      {/* Notification items */}
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          // Each notification item
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
            {/* User avatar */}
            <img className="rounded-full h-10 w-10" src={item.image} alt={item.message} />
            <div>
              {/* Notification message */}
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              {/* Notification description */}
              <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
        
        {/* Button to see all notifications */}
        <div className="mt-5">
          <Button color="white" bgColor={currentColor} text="See all notifications" borderRadius="10px" width="full" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
