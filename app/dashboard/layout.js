import AdminSidebar from "../_components/AdminSidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="relative flex flex-grow flex-col bg-light  sm:flex-row">
        <AdminSidebar />
        {children}
      </div>
    </>
  );
}
