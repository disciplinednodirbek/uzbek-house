import AppRoutes from "routes";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="w-full h-full">
      {pathname !== "/login" && (
        <nav>
          <Navbar />
        </nav>
      )}
      <div className="flex items-start h-[100vh] overflow-x-auto">
        {pathname !== "/login" && (
          <aside className="w-[15%] h-[100%] shadow py-4">
            <Sidebar />
          </aside>
        )}
        <Outlet />
        <section
          className={`${
            pathname !== "/login" ? "w-[85%] p-4" : "w-full"
          } bg-gray-50 h-[100%] overflow-x-auto`}
        >
          <AppRoutes />
        </section>
      </div>
    </div>
  );
}
