import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png"; // Imagen por defecto si no hay

export default function Destacados() {
  const [eventos, setEventos] = useState([]);

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

      // Ordenar por fecha descendente
      eventosArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setEventos(eventosArray);
    } catch (error) {
      console.error("Error al obtener eventos: ", error);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className="lg:col-span-4 flex flex-col gap-8">
      <h3 className="font-display font-black text-xl uppercase border-b-2 border-black dark:border-white pb-2">
        Ultimas Noticias
      </h3>

      {eventos.length > 0 ? (
        eventos.map((evento) => (
          <div key={evento.id} className="flex gap-4 group cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <img
                src={evento.imagenes?.[0] || noticiaDefault}
                alt={evento.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm leading-snug group-hover:underline">
                {evento.titulo}
              </h4>
              <p className="text-xs text-zinc-500 mt-1 uppercase font-medium">
                {formatFecha(evento.fecha)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}
