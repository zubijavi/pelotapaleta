import { Outlet } from "react-router-dom";
import Sponsors from "../components/Sponsors/Sponsors";

const MainLayout = () => {
  return (
    <main className="">

      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* CONTENIDO CENTRAL */}
        <div className="lg:col-span-12">
          <Outlet />
        </div>

        {/* ASIDE FIJO */}
        {/* <Sponsors /> */}

      </div>

    </main>
  );
};

export default MainLayout;
