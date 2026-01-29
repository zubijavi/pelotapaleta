import { Outlet } from "react-router-dom";
import Aside from "../components/Aside/Aside";

const MainLayout = () => {
  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* CONTENIDO CENTRAL */}
        <div className="lg:col-span-9">
          <Outlet />
        </div>

        {/* ASIDE FIJO */}
        <Aside />

      </div>

    </main>
  );
};

export default MainLayout;
