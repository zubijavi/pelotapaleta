import { useState } from "react";
import { Link } from "react-router-dom";
import LogoTienda from "../../assets/logoTienda.jpg";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-32">
          {/* Botón Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-14 h-14 flex items-center justify-center"
              aria-label="Abrir menú"
            >
              <span
                className={`
                  absolute h-0.5 w-6 bg-black dark:bg-white transition-all duration-300
                  ${mobileOpen ? "rotate-45" : "-translate-y-2"}
                `}
              />
              <span
                className={`
                  absolute h-0.5 w-6 bg-black dark:bg-white transition-all duration-300
                  ${mobileOpen ? "opacity-0" : ""}
                `}
              />
              <span
                className={`
                  absolute h-0.5 w-6 bg-black dark:bg-white transition-all duration-300
                  ${mobileOpen ? "-rotate-45" : "translate-y-2"}
                `}
              />
            </button>
          </div>
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/">
              <button onClick={scrollToTop} className="cursor-pointer">
                <h1 className="text-xl lg:text-3xl font-black">
                  PELOTA PALETA
                </h1>
                <h5 className="text-center lg:text-left text-sm lg:text-lg font-semibold">
                  Rosario
                </h5>
              </button>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8 font-bold text-xs tracking-widest uppercase">
              <li>
                <Link to="#" className="hover:opacity-70 transition">
                  Calendario 2026
                </Link>
              </li>
              <li>
                <Link to="/reglamento" className="hover:opacity-70 transition">
                  Reglamento
                </Link>
              </li>
              <li>
                <a href="#footer" className="hover:opacity-70 transition">
                  Contacto
                </a>
              </li>
              {/* <li>
                <Link
                  to="/tienda"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 hover:opacity-70 transition"
                >
                  Tienda
                </Link>
              </li> */}
            </ul>
          </nav>


          {/* Logo Tienda */}
          <div>

            <Link
              to="/tienda"
              onClick={() => setMobileOpen(false)}
            >
              <img src={LogoTienda} alt="logo tienda" className="h-20 lg:h-26" />
            </Link>
          </div>
        </div>
      </div>


      {/* Menú Mobile Animado */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-1000 ease-in-out
          ${mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <ul className="flex flex-col p-4 font-bold text-lg tracking-widest uppercase">
                 <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="py-3 hover:opacity-70 transition"
              >
                Calendario 2026
              </Link>
            </li>
            <li>
              <Link
                to="/reglamento"
                onClick={() => setMobileOpen(false)}
                className="py-3 hover:opacity-70 transition"
              >
                Reglamento
              </Link>
            </li>

            <li>
              <a
                href="#footer"
                onClick={() => setMobileOpen(false)}
                className="py-3 hover:opacity-70 transition"
              >
                Contacto
              </a>
            </li>
            {/* <li>
              <Link
                to="/tienda"
                onClick={() => setMobileOpen(false)}
                className="py-3 hover:opacity-70 transition"
              >
                Tienda
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </header >
  );
}