import React, { useState } from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { scheduleData } from '../data/dummy'; // Importing dummy schedule data
import { Header } from '../components'; // Importing Header component

// PropertyPane component to wrap child elements
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState(); // State to hold the reference to ScheduleComponent

  // Function to handle date change in DatePicker
  const change = (args) => {
    scheduleObj.selectedDate = args.value; // Update the selected date in ScheduleComponent
    scheduleObj.dataBind(); // Rebind the data to reflect the changes
  };

  // Function to enable navigation on drag start
  const onDragStart = (arg) => {
    arg.navigation.enable = true; // Enable navigation during drag-and-drop
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header component to display the title and category */}
      <Header category="App" title="Calendar" />

      {/* ScheduleComponent from Syncfusion */}
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)} // Set the reference to ScheduleComponent
        selectedDate={new Date(2021, 0, 10)} // Default selected date
        eventSettings={{ dataSource: scheduleData }} // Data source for the events
        dragStart={onDragStart} // Event handler for drag start
      >
        {/* ViewsDirective to define different calendar views */}
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
            <ViewDirective key={item} option={item} /> // Define each view option
          ))}
        </ViewsDirective>

        {/* Inject services to enable different features in the calendar */}
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>

      {/* PropertyPane component to hold the DatePicker */}
      <PropertyPane>
        <table style={{ width: '100%', background: 'white' }}>
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                {/* DatePickerComponent from Syncfusion */}
                <DatePickerComponent
                  value={new Date(2021, 0, 10)} // Default value for the date picker
                  showClearButton={false} // Disable the clear button
                  placeholder="Current Date" // Placeholder text
                  floatLabelType="Always" // Floating label type
                  change={change} // Event handler for date change
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
