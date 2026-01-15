import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png";

const NewDetails = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return `${String(fecha.getDate()).padStart(2, "0")}/${String(
            fecha.getMonth() + 1
        ).padStart(2, "0")}/${fecha.getFullYear()}`;
    };

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const docRef = doc(db, "eventos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNoticia({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setNoticia(null);
                }
            } catch (error) {
                console.error("Error al obtener la noticia:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticia();
    }, [id]);

    if (loading) {
        return (
            <main className="container mx-auto px-4 py-24">
                <p className="text-center text-zinc-500">Cargando noticia...</p>
            </main>
        );
    }

    if (!noticia) {
        return (
            <main className="container mx-auto px-4 py-24">
                <p className="text-center">La noticia no existe.</p>
                <Link to="/" className="block text-center mt-4 underline">
                    Volver
                </Link>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">


            <span className="inline-block bg-black text-white text-[10px] px-2 py-1 uppercase font-black mb-4">
                {formatFecha(noticia.fecha)}
            </span>

            <h1 className="text-4xl lg:text-5xl font-display font-black leading-tight mb-6 uppercase">
                {noticia.titulo}
            </h1>

            <div className="mb-8 bg-zinc-200 dark:bg-zinc-800 aspect-video overflow-hidden">
                <img
                    src={noticia.imagenes?.[0] || noticiaDefault}
                    alt={noticia.titulo}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {noticia.descripcion
                        .split("\n")
                        .filter(p => p.trim() !== "")
                        .map((parrafo, i) => (
                            <p
                                key={i}
                                className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4"
                            >
                                {parrafo}
                            </p>
                        ))}
                </p>
            </div>

            {/* Galería opcional */}
            {noticia.imagenes?.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                    {noticia.imagenes.slice(1).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${noticia.titulo} ${index + 2}`}
                            className="w-full h-48 object-cover bg-zinc-200"
                        />
                    ))}
                </div>
            )}
            <Link
                to="/"
                className="inline-block mb-6 text-xs font-bold uppercase underline"
            >
                ← Volver
            </Link>
        </main>
    );
};

export default NewDetails;
