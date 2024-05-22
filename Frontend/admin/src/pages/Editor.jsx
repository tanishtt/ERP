import React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

// Importing a custom Header component for consistent page headers
import { Header } from '../components';
// Importing EditorData which contains the initial content/data for the editor
import { EditorData } from '../data/dummy';

// Functional component definition for the Editor page
const Editor = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    {/* Header component for the Editor page */}
    <Header category="App" title="Editor" />
    
    {/* Syncfusion RichTextEditorComponent for rich text editing capabilities */}
    <RichTextEditorComponent>
      {/* Initial content for the editor passed as children */}
      <EditorData />
      {/* Injecting required services to the RichTextEditorComponent */}
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent>
  </div>
);

// Exporting the Editor component as default export
export default Editor;
