import React from "react";

const sponsorsData = [
    {
        nombre: "Guastavino",
        descripcion:
            "Artículos deportivos para la práctica de la pelota paleta y padel.",
        imagen:
            "https://guastavino.com.ar/wp-content/uploads/2023/03/cropped-WhatsApp-Image-2023-03-07-at-14.13.58.jpeg",
        sitio: "https://guastavino.com.ar/",
    },
    {
        nombre: "Dabber",
        descripcion:
            "Artículos deportivos para la práctica de la pelota paleta y padel.",
        imagen:
            "https://d22fxaf9t8d39k.cloudfront.net/3b36578f62c62de3ff415bd8149c27dbd3e60a10c5820ed4565e2832cc75a2e2270088.png",
        sitio: "https://www.dabberfronton.com.ar/",
    }];

export default function Sponsors() {
    return (
        <>
            <h1 className="text-3xl md:text-2xl font-black uppercase tracking-tight text-center leading-none mb-4">
                Sponsors
            </h1>
            {/* <div className="w-24 h-2 bg-black dark:bg-white"></div> */}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto px-4 justify-items-center">
                {sponsorsData.map((sponsor, index) => (
                    <div
                        key={index}
                        className="group border-t-2 border-black dark:border-white pt-4 w-full max-w-sm text-center"
                    >
                        <div className="bg-gray-100 dark:bg-gray-800 aspect-350 flex items-center justify-center p-4 mb-4 overflow-hidden">
                            <img
                                src={sponsor.imagen}
                                alt={sponsor.nombre}
                                className="grayscale-hover max-h-24 object-contain"
                            />
                        </div>

                        {/* <h3 className="text-sm font-black uppercase mb-2">
                            {sponsor.nombre}
                        </h3> */}

                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs leading-relaxed">
                            {sponsor.descripcion}
                        </p>
                        <p></p>
                        <a
                            href={sponsor.sitio}
                            className="inline-flex items-center justify-center text-[15px] font-bold uppercase tracking-widest group-hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visitar sitio
                        </a>
                    </div>
                ))}
            </section>

        </>
    );
}
