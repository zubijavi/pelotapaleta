import { Outlet } from "react-router-dom";
import Sponsors from "../components/Sponsors/Sponsors";

const MainLayout = () => {
  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* CONTENIDO CENTRAL */}
        <div className="lg:col-span-10">
          <Outlet />
        </div>

        {/* ASIDE FIJO */}
        <Sponsors />

      </div>

    </main>
  );
};

export default MainLayout;
