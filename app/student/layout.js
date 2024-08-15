import AdminSidebar from "../_components/AdminSidebar";
import Fetcher from "../_components/Fetcher";

function layout({ children }) {
  return (
    <>
      <div className="relative flex flex-grow flex-col bg-light  sm:flex-row">
        <Fetcher>
          <AdminSidebar />
        </Fetcher>
        {children}
      </div>
    </>
  );
}

export default layout;
