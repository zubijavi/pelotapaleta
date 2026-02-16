import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png"; // Imagen por defecto si no hay


const Main = () => {
    const [eventos, setEventos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [mostrarMobile, setMostrarMobile] = useState(false);

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

    const handleVerMas = () => {
        setVisibleCount(prev => prev + 2);
    };
    return (
        <main className="w-full px-4 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 📰 NOTICIA PRINCIPAL */}
                <div className="lg:col-span-8 group">
                    {ultimaNoticia ? (
                        <Link to={`/noticia/${ultimaNoticia.id}`}>
                                <span className="inline-block bg-black text-white text-sm px-2 py-1 uppercase font-black ">
                                    {formatFecha(ultimaNoticia.fecha)}
                                </span>

                                <h1 className="text-center text-2xl lg:text-3xl font-display font-black leading-tight mb-4 uppercase tracking-tighter">
                                    {ultimaNoticia.titulo}
                                </h1>

                            <div className="overflow-hidden bg-zinc-200 dark:bg-zinc-800 aspect-video flex items-center justify-center">
                                <img
                                    alt={ultimaNoticia.titulo}
                                    className=" 
                                    h-52 lg:h-105
                                    transition-transform duration-700 group-hover:scale-105"
                                    src={ultimaNoticia.imagenes?.[0] || noticiaDefault}
                                />
                            </div>
                        </Link>
                    ) : (
                        <p>No hay noticias disponibles.</p>
                    )}
                </div>

                {/* 📰 DOS SIGUIENTES */}
                <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 place-items-center">
                    {/* <div className="border lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6"> */}
                    {eventos.slice(1, 3).map(evento => (
                        <Link
                            key={evento.id}
                            to={`/noticia/${evento.id}`}
                            className="group"
                        >

                            <p className="text-right text-s text-zinc-600 uppercase">
                                {formatFecha(evento.fecha)}
                            </p>

                            <h3 className="font-bold text-m leading-snug">
                                {evento.titulo}
                            </h3>
                            {/* <div className="overflow-hidden bg-zinc-200 dark:bg-zinc-800 aspect-video mb-2"> */}
                            <div className="overflow-hidden bg-zinc-200 aspect-video mb-2 flex items-center justify-center">

                                <img
                                    src={evento.imagenes?.[0] || noticiaDefault}
                                    className=" object-cover transition-transform duration-500 group-hover:scale-105"

                                // className=" object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

            {/* 📰 RESTO DE NOTICIAS */}
            <button
                onClick={() => setMostrarMobile(!mostrarMobile)}
                className="md:hidden mt-5 mb-5 w-full text-sm font-bold uppercase text-blue-600"
            >
                {mostrarMobile ? "Ocultar noticias anteriores" : "Noticias anteriores"}
            </button>
            <div className="flex items-center justify-center">

                {/* <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"> */}
                <div
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 ${mostrarMobile ? "block" : "hidden"} md:grid `}
                >
                    {eventos.slice(3, visibleCount + 3).map(evento => (
                        <Link key={evento.id} to={`/noticia/${evento.id}`} className="group">
                            <p className="text-xs text-zinc-500 uppercase">
                                {formatFecha(evento.fecha)}
                            </p>

                            <h4 className="font-bold text-sm leading-snug">
                                {evento.titulo}
                            </h4>

                            <div className="overflow-hidden bg-zinc-200 aspect-video mb-2 flex items-center justify-center">
                                <img
                                    src={evento.imagenes?.[0] || noticiaDefault}
                                    className="max-h-40 w-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>


                        </Link>
                    ))}
                </div>



                {visibleCount + 3 < eventos.length && (
                    <button
                        onClick={handleVerMas}
                        className="mt-5 text-sm font-bold uppercase text-blue-600"
                    >
                        Ver más
                    </button>
                )}
            </div>

        </main>
    );
};

export default Main;
