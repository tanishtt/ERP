import React from 'react'; // Importing React
import { MdOutlineCancel } from 'react-icons/md'; // Importing cancel icon from react-icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'; // Importing plus and minus icons from react-icons

import { useStateContext } from '../contexts/ContextProvider'; // Importing custom hook from context provider
import { cartData } from '../data/dummy'; // Importing dummy cart data
import { Button } from '.'; // Importing Button component from the current directory

const Cart = () => {
  // Using the custom hook to get current color from the context provider
  const { currentColor } = useStateContext();

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      {/* Main container for the cart with background and positioning styles */}
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        {/* Cart content container with dark mode and transition styles */}
        <div className="flex justify-between items-center">
          {/* Header section of the cart */}
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            // Button to close the cart
            icon={<MdOutlineCancel />} // Cancel icon
            color="rgb(153, 171, 180)" // Text color
            bgHoverColor="light-gray" // Background hover color
            size="2xl" // Size of the button
            borderRadius="50%" // Border radius
          />
        </div>
        {/* Mapping through the cart data to display each item */}
        {cartData?.map((item, index) => (
          <div key={index}>
            <div>
              {/* Item container with flexbox styles */}
              <div className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                {/* Item image */}
                <div>
                  {/* Item details */}
                  <p className="font-semibold ">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.category}</p>
                  <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">{item.price}</p>
                    {/* Quantity controls */}
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                      <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus /></p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">0</p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Subtotal and total section */}
        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">$890</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">$890</p>
          </div>
        </div>
        {/* Place order button */}
        <div className="mt-5">
          <Button
            color="white" // Text color
            bgColor={currentColor} // Background color from context
            text="Place Order" // Button text
            borderRadius="10px" // Border radius
            width="full" // Full width
          />
        </div>
      </div>
    </div>
  );
};

export default Cart; // Exporting Cart component as default export
