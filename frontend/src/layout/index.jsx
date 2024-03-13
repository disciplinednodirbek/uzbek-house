import Navbar from "components/Navbar";
import AppRoutes from "routes";

export default function Layout() {
  return (
    <div className="pb-4">
      <nav>
        <Navbar />
      </nav>
      <div>
        <AppRoutes />
      </div>
    </div>
  );
}
