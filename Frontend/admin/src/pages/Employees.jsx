import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

// Importing dummy data for employees and the Header component
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

// Functional component definition for the Employees page
const Employees = () => {
  // Options for the toolbar, including search functionality
  const toolbarOptions = ['Search'];

  // Configuration for editing options
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header component displaying the title and category */}
      <Header category="Page" title="Employees" />
      
      {/* GridComponent for displaying employee data */}
      <GridComponent
        dataSource={employeesData} // Data source for the grid
        width="auto" // Set the grid width to adjust automatically
        allowPaging // Enable paging in the grid
        allowSorting // Enable sorting in the grid
        pageSettings={{ pageCount: 5 }} // Configuration for pagination
        editSettings={editing} // Configuration for editing options
        toolbar={toolbarOptions} // Toolbar options including search functionality
      >
        <ColumnsDirective>
          {/* Mapping through columns configuration for employeesGrid */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        
        {/* Injecting required services such as Search and Page */}
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

// Exporting the Employees component as default export
export default Employees;
