import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png";

const NewDetails = () => {
  useEffect(() => {
    window.scrollTo({
  top: 0,
  behavior: "smooth",
});
  }, []);

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

  const shareUrl = window.location.href;

  const shareText = noticia.titulo;

  const compartirWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + shareUrl
    )}`;
    window.open(url, "_blank");
  };

  return (
    <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-10">



      <div className="flex justify-between items-center">
        <span className="inline-block bg-black text-white text-[12px] px-2 py-1 uppercase font-black ">
          {formatFecha(noticia.fecha)}
        </span>

        <button
          onClick={compartirWhatsApp}
          className="flex items-center gap-2 px-2 py-1 lg:px-5 lg:py-2 border-2 border-green-500 text-green-500 rounded-lg font-bold uppercase text-[8px] lg:text-sm hover:bg-green-500 hover:text-white transition-all duration-200 " >


          {/* Ícono WhatsApp */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3 h-3 lg:w-5 lg:h-5"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 0 0-8.94 14.47L2 22l5.7-1.5A10 10 0 1 0 12 2Zm0 18a7.94 7.94 0 0 1-4.05-1.1l-.29-.17-3.38.89.9-3.3-.19-.34A8 8 0 1 1 12 20Zm4.38-5.62c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.17-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
          </svg>

          Compartir
        </button>
      </div>

      <h1 className="text-xl lg:text-3xl font-display font-black leading-tight mt-6 mb-6 uppercase">
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
      {/* BOTON VOLVER */}
      <div className="text-right">
        <Link
          to="/"
          className="text-right text-m font-bold uppercase underline"
        >
          ← Volver
        </Link>
      </div>
    </main>
  );
};

export default NewDetails;