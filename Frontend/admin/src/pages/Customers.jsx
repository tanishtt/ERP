import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

// Customers component to render a data grid for customer data
const Customers = () => {
  // Settings for row selection
  const selectionsettings = { persistSelection: true };
  // Options for the toolbar, allowing delete operation
  const toolbarOptions = ['Delete'];
  // Settings for editing, allowing deleting and editing of rows
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header component to display the title and category */}
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData} // Data source for the grid
        enableHover={false} // Disable hover effect on rows
        allowPaging // Enable pagination
        pageSettings={{ pageCount: 5 }} // Page settings with 5 pages visible at a time
        selectionSettings={selectionsettings} // Row selection settings
        toolbar={toolbarOptions} // Toolbar options
        editSettings={editing} // Editing settings
        allowSorting // Enable sorting
      >
        <ColumnsDirective>
          {/* Dynamically create ColumnDirective for each item in customersGrid */}
          {customersGrid.map((item, index) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        {/* Inject necessary services for the grid */}
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
