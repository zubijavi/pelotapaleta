import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-12">
      <div className="container mx-auto px-4 text-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Rosario Pelota Pelota Logo"
          className="h-35 mx-auto mb-16"
        />

        {/* Links */}
        <nav className="flex justify-center gap-8 mb-8 text-zinc-400 uppercase text-xs font-bold tracking-[0.2em]">
          <Link to="/ranking" className="hover:text-white transition-colors">
            Ranking
          </Link>
          <Link to="/noticias" className="hover:text-white transition-colors">
            Noticias
          </Link>
          <Link to="/clubes" className="hover:text-white transition-colors">
            Clubes
          </Link>
          <Link to="/contacto" className="hover:text-white transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
          © 2024 Rosario Pelota Pelota. Pasión por la Paleta.
        </p>

      </div>
    </footer>
  )
}
