import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import noticiaDefault from "../../assets/logoPelotari.png"; // Imagen por defecto si no hay


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
        <main className="w-full p-8 bg-linear-to-r from-slate-100 to-zinc-300">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">

                {/* 📰 NOTICIA PRINCIPAL */}
                <div className="lg:col-span-8 group bg-zinc-300 rounded-md">
                    {ultimaNoticia ? (
                        <Link to={`/noticia/${ultimaNoticia.id}`}>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-sm py-2">
                                    {formatFecha(ultimaNoticia.fecha)}
                                </span>
                                <h1 className="text-2xl text-center pb-2 lg:text-3xl uppercase">
                                    {ultimaNoticia.titulo}
                                </h1>
                            </div>

                            <div className="overflow-hidden aspect-video flex items-center justify-center">
                                <img
                                    alt={ultimaNoticia.titulo}
                                    className="h-100 lg:h-120 object-cover"
                                    src={ultimaNoticia.imagenes?.[0] || noticiaDefault}
                                />
                            </div>
                        </Link>
                    ) : (
                        <p>No hay noticias disponibles.</p>
                    )}
                </div>

                {/* 📰 DOS SIGUIENTES */}
                <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 place-items-center ">
                    {/* <div className="border lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6"> */}
                    {eventos.slice(1, 3).map(evento => (
                        <Link
                            key={evento.id}
                            to={`/noticia/${evento.id}`}
                            className="group bg-zinc-300 p-2 rounded-md"
                        >

                            <p className="text-right text-l text-zinc-600">
                                {formatFecha(evento.fecha)}
                            </p>

                            <h3 className="text-l font-['Helvetica'] font-bold uppercase text-center">
                                {evento.titulo}
                            </h3>
                            {/* <div className="overflow-hidden bg-zinc-200 dark:bg-zinc-800 aspect-video mb-2"> */}
                            <div className="aspect-video flex items-center justify-center overflow-hidden rounded-lg">
                                <img
                                    src={evento.imagenes?.[0] || noticiaDefault}
                                    alt={evento.titulo}
                                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
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



            </div>
            <div className="flex justify-center">
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
