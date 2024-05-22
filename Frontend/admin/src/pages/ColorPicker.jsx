import React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

import { Header } from '../components';

// Function to handle the color change event
const change = (args) => {
  // Update the background color of the element with id 'preview'
  document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
};

// Custom component for the ColorPickerComponent with specific props
const CustomColorPicker = ({ id, mode }) => (
  <ColorPickerComponent
    id={id}
    mode={mode}
    modeSwitcher={false} // Disable mode switcher
    inline // Render the color picker inline
    showButtons={false} // Hide action buttons
    change={change} // Event handler for color change
  />
);

// Main ColorPicker component
const ColorPicker = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    {/* Header component to display the title and category */}
    <Header category="App" title="Color Picker" />
    <div className="text-center">
      {/* Div element to preview the selected color */}
      <div id="preview" />
      <div className="flex justify-center items-center gap-20 flex-wrap">
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">Inline Palette</p>
          {/* Inline Palette Color Picker */}
          <CustomColorPicker id="inline-palette" mode="Palette" />
        </div>
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
          {/* Inline Picker Color Picker */}
          <CustomColorPicker id="inline-picker" mode="Picker" />
        </div>
      </div>
    </div>
  </div>
);

export default ColorPicker;
