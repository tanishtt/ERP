import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

// Importing dummy data for orders, context menu items, and the Header component
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

// Functional component definition for the Orders page
const Orders = () => {
  // Configuration for editing settings
  const editing = { allowDeleting: true, allowEditing: true };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header component displaying the title and category */}
      <Header category="Page" title="Orders" />
      
      {/* GridComponent for displaying orders */}
      <GridComponent
        id="gridcomp" // Unique id for the GridComponent
        dataSource={ordersData} // Data source for the grid
        allowPaging // Allowing paging in the grid
        allowSorting // Allowing sorting in the grid
        allowExcelExport // Allowing Excel export functionality
        allowPdfExport // Allowing PDF export functionality
        contextMenuItems={contextMenuItems} // Context menu items for the grid
        editSettings={editing} // Editing settings for the grid
      >
        <ColumnsDirective>
          {/* Mapping through columns configuration for the grid */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        
        {/* Injecting required services for the grid */}
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};

// Exporting the Orders component as default export
export default Orders;
