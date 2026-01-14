import "./announcements.css"

export default function Announcements() {
    return (
        <div className="bg-black text-white py-2 overflow-hidden border-b border-zinc-800">
            <div className="container mx-auto px-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">

                {/* Label */}
                {/* <span className="bg-white text-black px-2 py-0.5 whitespace-nowrap">
          Último Momento
        </span> */}

                {/* Marquee */}
                <div className="marquee flex gap-8 whitespace-nowrap">
                    <span>SITIO EN CONSTRUCCION</span>
                    <span className="opacity-50">•</span>
                     <span>SITIO EN CONSTRUCCION</span>
                    <span className="opacity-50">•</span>
                     <span>SITIO EN CONSTRUCCION</span>
                    <span className="opacity-50">•</span>

                    {/* <span className="opacity-50">•</span>
          <span>Inscripciones abiertas para la Escuela de Menores 2024.</span>
          <span className="opacity-50">•</span>
          <span>Pelota Paleta: Rosario recibe el Provincial de Primera Categoría.</span> */}
                </div>

            </div>
        </div>
    )
}
