import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white">
      <div className="container mx-auto px-4 text-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Rosario Pelota Pelota Logo"
          className="h-35 mx-auto"
        />

        <nav className="flex justify-center gap-8 mb-8 text-zinc-400 uppercase text-xs font-bold tracking-[0.2em]">
                    <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/login"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            Login
          </Link>
        </nav>
        {/* Links */}

        {/* Copyright */}
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
          © 2024 Rosario Pelota Pelota. Pasión por la Paleta.
        </p>

      </div>
    </footer>
  )
}
