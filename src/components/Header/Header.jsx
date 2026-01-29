import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Función para hacer scroll al footer
    const scrollToFooter = () => {
        const footer = document.getElementsById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
            setMobileOpen(false); // cerrar menú mobile si está abierto
        }
    };

    // Función para ir al top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-24 lg:h-32">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to="/">
                            <button onClick={scrollToTop}>
                                <img
                                    src={logo}
                                    alt="Rosario Pelota Pelota Logo"
                                    className="h-30 lg:h-40 w-auto cursor-pointer"
                                />
                            </button>
                        </Link>
                    </div>

                    {/* Nav Desktop */}
                    <nav className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
                            <li>
                                <Link
                                    to="/"
                                    className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Calendario
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/reglamento"
                                    className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Reglamento
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/login  "
                                    className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <a href="#footer" className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Botón Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="p-2"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Abrir menú"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-zinc-900 dark:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Mobile */}
            {mobileOpen && (
                <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <ul className="flex flex-col p-4 font-bold text-lg tracking-widest uppercase">
                        <li>
                            <Link
                                to="/"
                                className="block py-4 border-b border-zinc-100 dark:border-zinc-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/reglamento"
                                className="block py-4 border-b border-zinc-100 dark:border-zinc-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Reglamento
                            </Link>
                        </li>

                        <li>
                            <a href="#footer" className="relative text-zinc-900 dark:text-white font-bold uppercase tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
