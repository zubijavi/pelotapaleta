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
        <main className="w-full px-4 lg:px-8 py-12">
                <div className="lg:col-span-8 group cursor-pointer max-h-[80vh] overflow-y-auto pr-4 scroll-smooth">

                {ultimaNoticia ? (
                    <>
                        <span className="inline-block bg-black text-white text-[10px] px-2 py-1 uppercase font-black mb-4">
                            {formatFecha(ultimaNoticia.fecha)}
                        </span>
                        <Link to={`/noticia/${ultimaNoticia.id}`}>
                            <h1 className="text-4xl lg:text-6xl font-display font-black leading-tight mb-4 uppercase tracking-tighter">
                                {ultimaNoticia.titulo}
                            </h1>
                        </Link>
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
        </main>
    );
};

export default Main;
