import { useRef, useState } from "react"
import { Link } from "react-router-dom";


export default function Footer() {


  return (
<footer
  id="footer"
  className="bg-zinc-900 text-zinc-200 flex flex-col items-center justify-center py-6"
>
  <div className="w-full border-b border-zinc-700 pb-4 flex justify-center">
    <Link
      to="/login"
      className="hover:opacity-70 transition text-zinc-400"
    >
      Login
    </Link>
  </div>

  <div className="pt-4 text-center text-xs text-zinc-400">
    © {new Date().getFullYear()} Rosario Pelota Paleta. Todos los derechos reservados.
  </div>
</footer>
  )
}
