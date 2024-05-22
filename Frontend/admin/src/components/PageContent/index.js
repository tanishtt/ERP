// Importing AppRoutes component from a relative path
import AppRoutes from "../AppRoutes";

// PageContent functional component definition
function PageContent() {
  return (
    // Container div with a class name "PageContent"
    <div className="PageContent">
      {/* Render the AppRoutes component */}
      <AppRoutes />
    </div>
  );
}

// Exporting the PageContent component as the default export
export default PageContent;
