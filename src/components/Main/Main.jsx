import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png"; // Imagen por defecto si no hay

const Main = () => {
    const [eventos, setEventos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);

    // Formatear fecha a DD/MM/YYYY
    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const año = fecha.getFullYear();
        return `${dia}/${mes}/${año}`;
    };

    // Obtener eventos desde Firestore
    const fetchEventos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "eventos"));
            const eventosArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Ordenar por fecha descendente (últimos primero)
            eventosArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            setEventos(eventosArray);
        } catch (error) {
            console.error("Error al obtener eventos: ", error);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    // Obtener la última noticia (la más reciente)
    const ultimaNoticia = eventos.length > 0 ? eventos[0] : null;


      // Mostrar más noticias   
      const handleVerMas = () => {
    setVisibleCount((prev) => prev + 2); // Muestra 4 más cada vez
  };

    return (
        <main className="container mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                {/* Principal: última noticia */}
                <div className="lg:col-span-8 group cursor-pointer">
                    {ultimaNoticia ? (
                        <>
                                <span className="inline-block bg-black text-white text-[10px] px-2 py-1 uppercase font-black mb-4">
                                    {formatFecha(ultimaNoticia.fecha)}
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-display font-black leading-tight mb-4 uppercase tracking-tighter">
                                    {ultimaNoticia.titulo}
                                </h1>
                            <div className="overflow-hidden mb-6 bg-zinc-200 dark:bg-zinc-800 aspect-video">
                                <img
                                    alt={ultimaNoticia.titulo}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-zinc-200"
                                    src={ultimaNoticia.imagenes?.[0] || noticiaDefault}
                                />
                            </div>
                            <div className="max-w-3xl">
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                                    {ultimaNoticia.descripcion}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p>No hay noticias disponibles.</p>
                    )}
                </div>

                {/* Columna lateral: últimas noticias */}
<div className="lg:col-span-4 flex flex-col gap-8">
      <h3 className="font-display font-black text-xl uppercase border-b-2 border-black dark:border-white pb-2">
        Últimas Noticias
      </h3>

      {eventos.length > 0 ? (
        <>
          {eventos.slice(0, visibleCount).map((evento) => (
            <div key={evento.id} className="flex gap-4 group cursor-pointer">
              <div className="w-24 h-24 shrink-0 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={evento.imagenes?.[0] || noticiaDefault}
                  alt={evento.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <p className="text-xs text-zinc-500 mt-1 uppercase font-medium">
                  {formatFecha(evento.fecha)}
                </p>
                <h4 className="font-bold text-sm leading-snug group-hover:underline">
                  {evento.titulo}
                </h4>
              </div>
            </div>
          ))}

          {visibleCount < eventos.length && (
            <button
              onClick={handleVerMas}
              className="mt-2 text-sm font-bold uppercase text-blue-600 hover:underline self-start"
            >
              Ver noticias anteriores
            </button>
          )}
        </>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}

                    {/* Suscripción */}
                    <div className="mt-4 p-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <h5 className="font-display font-black text-xs uppercase mb-2">
                            Suscripción
                        </h5>
                        <p className="text-xs mb-4 text-zinc-600 dark:text-zinc-400 italic">
                            Recibí las últimas novedades del circuito rosarino en tu correo.
                        </p>
                        <form className="flex">
                            <input
                                className="w-full bg-white dark:bg-black border-zinc-300 dark:border-zinc-700 text-sm focus:ring-0 focus:border-black dark:focus:border-white"
                                placeholder="Email"
                                type="email"
                            />
                            <button className="bg-black dark:bg-white text-white dark:text-black px-4 font-black uppercase text-[10px] tracking-widest">
                                OK
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
