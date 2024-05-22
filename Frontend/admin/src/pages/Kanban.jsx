import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

// Importing dummy data for Kanban and the Header component
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

// Functional component definition for the Kanban page
const Kanban = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    {/* Header component displaying the title and category */}
    <Header category="App" title="Kanban" />
    
    {/* KanbanComponent for displaying Kanban board */}
    <KanbanComponent
      id="kanban" // Unique id for the Kanban component
      keyField="Status" // Key field for the Kanban cards
      dataSource={kanbanData} // Data source for the Kanban board
      cardSettings={{ contentField: 'Summary', headerField: 'Id' }} // Configuration for Kanban card settings
    >
      <ColumnsDirective>
        {/* Mapping through columns configuration for Kanban grid */}
        {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);

// Exporting the Kanban component as default export
export default Kanban;
