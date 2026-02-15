import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png";

const NewDetails = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ✅ Modal */
  const [modalOpen, setModalOpen] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(0);

  const formatFecha = (fechaString) => {
    if (!fechaString) return "";
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

  /* ✅ Funciones modal */
  const abrirModal = (index) => {
    setImagenActiva(index);
    setModalOpen(true);
  };

  const cerrarModal = () => setModalOpen(false);

  const siguienteImagen = () => {
    setImagenActiva((prev) =>
      prev === noticia.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const anteriorImagen = () => {
    setImagenActiva((prev) =>
      prev === 0 ? noticia.imagenes.length - 1 : prev - 1
    );
  };

  /* ✅ Teclado */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;

      if (e.key === "Escape") cerrarModal();
      if (e.key === "ArrowRight") siguienteImagen();
      if (e.key === "ArrowLeft") anteriorImagen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, noticia]);

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
    <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-10">
      <Link
        to="/"
        className="inline-block mb-6 text-xs font-bold uppercase underline"
      >
        ← Volver
      </Link>

      <span className="inline-block bg-black text-white text-[10px] px-2 py-1 uppercase font-black mb-4">
        {formatFecha(noticia.fecha)}
      </span>

      <h1 className="text-4xl lg:text-5xl font-display font-black leading-tight mb-6 uppercase">
        {noticia.titulo}
      </h1>

      {/* Imagen principal */}
      <div className="mb-8 bg-zinc-200 dark:bg-zinc-800 aspect-video overflow-hidden">
        <img
          src={noticia.imagenes?.[0] || noticiaDefault}
          alt={noticia.titulo}
          onClick={() => abrirModal(0)}
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>

      {/* Descripción */}
      <div className="max-w-none">
        {noticia.descripcion
          ?.split("\n")
          .filter((p) => p.trim() !== "")
          .map((parrafo, i) => (
            <p
              key={i}
              className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4"
            >
              {parrafo}
            </p>
          ))}
      </div>

      {/* ✅ PLANILLA GOOGLE */}
      {noticia.planilla && (
        <div className="mt-12">
          <h3 className="text-center text-xl font-semibold mb-4">
            Inscriptos, zonas y resultados
          </h3>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden border shadow-sm rounded-lg">
              <iframe
                src={noticia.planilla}
                className="w-full h-100 bg-white"
                loading="lazy"
              />
            </div>
          </div>

          <a
            href={noticia.planilla}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-3 text-sm text-blue-600 font-semibold"
          >
            Abrir planilla en nueva pestaña
          </a>
        </div>
      )}

      {/* Galería */}
      {noticia.imagenes?.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {noticia.imagenes.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${noticia.titulo} ${index + 2}`}
              onClick={() => abrirModal(index + 1)}
              className="w-full h-48 object-cover bg-zinc-200 cursor-pointer hover:opacity-80 transition"
            />
          ))}
        </div>
      )}

      {/* ✅ MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={cerrarModal}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={noticia.imagenes[imagenActiva]}
              alt=""
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full text-xl"
            >
              ✕
            </button>

            {/* Anterior */}
            <button
              onClick={anteriorImagen}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full text-xl"
            >
              ‹
            </button>

            {/* Siguiente */}
            <button
              onClick={siguienteImagen}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full text-xl"
            >
              ›
            </button>

            {/* Contador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/60 px-3 py-1 rounded-full">
              {imagenActiva + 1} / {noticia.imagenes.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default NewDetails;