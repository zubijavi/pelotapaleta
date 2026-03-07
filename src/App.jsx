import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Announcements from "./components/Announcements/Announcements.jsx";
import Players from "./components/Players/Players.jsx";
import NewDetails from "./components/NewDetails/NewDetails.jsx";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.css";
import Sponsors from "./components/Sponsors/Sponsors.jsx";
import Tienda from "./components/Tienda/Tienda.jsx";

function App() {
  return (
    <Router>
      {/* <Announcements /> */}
      <Header />
        {/* <Sponsors /> */}

      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/noticia/:id" element={<NewDetails />} />
          <Route path="/reglamento" element={<Players />} />
          <Route path="/tienda" element={<Tienda />} />


        </Route>
        {/* <Route path="/" element={<Main />} /> */}
        {/* <Route path="/noticia/:id" element={<NewDetails />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
