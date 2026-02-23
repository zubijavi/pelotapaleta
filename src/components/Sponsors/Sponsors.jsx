import React from "react";
import tuasegurador from "../../assets/tuasegurador.png";

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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3P7pykSxszcIl4EPnVXHyy6x7oJHY2q0MlA&s",
        sitio: "https://www.dabberfronton.com.ar/",
    },
    { nombre: "TuAsegurador",
        descripcion:
            "Pagina de Seguros",
        imagen:
           "https://www.tuasegurador.com.ar/assets/logo7-BruWrYrO.png",
        sitio: "https://www.tuasegurador.com.ar/",

    }];

export default function Sponsors() {
    return (
        <>
            {/* <h1 className="text-3xl md:text-2xl font-black uppercase tracking-tight text-center leading-none mb-4">
                Sponsors
            </h1> */}
            {/* <div className="w-24 h-2 bg-black dark:bg-white"></div> */}

            <section
                className="flex justify-evenly"
            // className="lg:col-span-2 top-24 self-start flex flex-col gap-8"
            >
                {/* // className="border grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto px-4 justify-items-center"> */}
                {sponsorsData.map((sponsor, index) => (
                    <div
                        key={index}
                        className="group text-center"
                    >
                        <div className="h-20   
                        flex items-center justify-center">
                            <a href={sponsor.sitio} target="_blank" rel="noopener noreferrer">
                                <img

                                    src={sponsor.imagen}
                                    alt={sponsor.nombre}
                                    className="w-40 h-40 object-contain"
                                />

                            </a>
                        </div>
               
                    </div >
                ))
                }
            </section >

        </>
    );
}
