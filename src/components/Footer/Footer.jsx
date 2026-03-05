import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function Footer() {

  const telefono = "5493413354935"
  const mensajeWhatsapp = "Hola! Quiero hacer una consulta desde la web."

  return (
    <footer id="footer" className="bg-black text-white py-36 lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* ===== TÍTULO + WHATSAPP ===== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">

          <h3 className="text-4xl  uppercase tracking-widest text-center md:text-left">
            Contactanos
          </h3>

          <a
            href={`https://wa.me/${telefono}?text=${encodeURIComponent(mensajeWhatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-7 h-7 fill-white"
            >
              <path d="M16.003 3C8.82 3 3 8.82 3 16c0 2.82.93 5.42 2.52 7.53L4 29l5.63-1.47A12.94 12.94 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16.003 3zm0 23.7c-2.3 0-4.44-.7-6.24-1.9l-.45-.27-3.34.87.9-3.26-.3-.48A10.64 10.64 0 015.4 16c0-5.86 4.75-10.6 10.6-10.6S26.6 10.14 26.6 16 21.86 26.7 16 26.7zm5.8-8.1c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.39-.26-.63-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68s1.15 3.1 1.31 3.32c.16.21 2.27 3.47 5.5 4.87.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.88-.77 2.15-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37z" />
            </svg>
          </a>

        </div>

        {/* ===== FORMULARIO ===== */}
        <form className="space-y-4 mb-12">

          <input
            type="text"
            placeholder="Nombre"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white transition"
          />

          <input
            type="text"
            placeholder="Email o Teléfono"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white transition"
          />

          <textarea
            placeholder="Mensaje"
            rows="4"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm resize-none focus:outline-none focus:border-white transition"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 uppercase text-xs font-bold tracking-widest hover:bg-zinc-300 transition"
          >
            Enviar
          </button>

        </form>

        {/* ===== LOGO ===== */}
        {/* <div className="flex justify-center border items-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={logo}
              alt="Rosario Pelota Pelota Logo"
              className="h-40 hover:scale-105 transition"
            />
          </Link>
        </div> */}

        {/* ===== COPYRIGHT ===== */}
        <div className="border-t border-zinc-800 pt-6 text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            © 2026 Rosario Pelota Pelota.
          </p>
        </div>

      </div>
    </footer>
  )
}