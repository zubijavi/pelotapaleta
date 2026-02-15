import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

export default function Admin() {
  /* =======================
     NOTICIAS / EVENTOS
  ======================= */
  const [eventos, setEventos] = useState([]);
  const [editEventoId, setEditEventoId] = useState(null);

  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [imagenesExistentes, setImagenesExistentes] = useState([]);

  const [subiendo, setSubiendo] = useState(false);

  const [eventoForm, setEventoForm] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    planilla: ""
  });

  /* =======================
     JUGADORES
  ======================= */
  const [jugadores, setJugadores] = useState([]);
  const [editJugadorId, setEditJugadorId] = useState(null);

  const [jugadorForm, setJugadorForm] = useState({
    nombre: "",
    categoriaFronton: "",
    categoriaTrinquete: ""
  });

  /* =======================
     UTILIDAD FECHA
  ======================= */
  const formatFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    return `${String(fecha.getDate()).padStart(2, "0")}/${String(
      fecha.getMonth() + 1
    ).padStart(2, "0")}/${fecha.getFullYear()}`;
  };

  /* =======================
     FETCH EVENTOS
  ======================= */
  const fetchEventos = async () => {
    const snap = await getDocs(collection(db, "eventos"));
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    setEventos(data);
  };

  /* =======================
     FETCH JUGADORES
  ======================= */
  const fetchJugadores = async () => {
    const snap = await getDocs(collection(db, "jugadores"));
    setJugadores(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchEventos();
    fetchJugadores();
  }, []);

  /* =======================
     STORAGE - SUBIR IMÁGENES
  ======================= */
  const subirImagenesEvento = async () => {
    const urls = [];

    for (const file of imagenesFiles) {
      const storageRef = ref(
        storage,
        `eventos/${Date.now()}-${file.name}`
      );

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    return urls;
  };

  /* =======================
     CRUD EVENTOS
  ======================= */
  const handleEventoSubmit = async (e) => {
    e.preventDefault();
    setSubiendo(true);

    try {
      let imagenesUrls = [...imagenesExistentes];

      if (imagenesFiles.length > 0) {
        const nuevasImagenes = await subirImagenesEvento();
        imagenesUrls = [...imagenesExistentes, ...nuevasImagenes];
      }

      const data = {
        titulo: eventoForm.titulo,
        descripcion: eventoForm.descripcion,
        fecha: eventoForm.fecha,
        planilla: eventoForm.planilla || "",
        imagenes: imagenesUrls,
        createdAt: serverTimestamp()
      };

      if (editEventoId) {
        await updateDoc(doc(db, "eventos", editEventoId), data);
        setEditEventoId(null);
        setImagenesExistentes([]);
      } else {
        await addDoc(collection(db, "eventos"), data);
      }

      setEventoForm({
        titulo: "",
        descripcion: "",
        fecha: "",
        planilla: ""
      });

      setImagenesFiles([]);
      fetchEventos();

    } catch (err) {
      console.error("Error guardando evento:", err);
    } finally {
      setSubiendo(false);
    }
  };

  const handleEventoEdit = (evento) => {
    setEditEventoId(evento.id);

    setEventoForm({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      planilla: evento.planilla || ""
    });

    setImagenesExistentes(evento.imagenes || []);
    setImagenesFiles([]);
  };

  const handleEventoDelete = async (id) => {
    if (confirm("¿Eliminar noticia?")) {
      await deleteDoc(doc(db, "eventos", id));
      fetchEventos();
    }
  };

  /* =======================
     Quitar imagen existente
  ======================= */
  const eliminarImagenExistente = (index) => {
    const nuevas = [...imagenesExistentes];
    nuevas.splice(index, 1);
    setImagenesExistentes(nuevas);
  };

  /* =======================
     Quitar imagen nueva
  ======================= */
  const eliminarImagenNueva = (index) => {
    const nuevas = [...imagenesFiles];
    nuevas.splice(index, 1);
    setImagenesFiles(nuevas);
  };

  /* =======================
     CRUD JUGADORES
  ======================= */
  const handleJugadorSubmit = async (e) => {
    e.preventDefault();

    if (editJugadorId) {
      await updateDoc(
        doc(db, "jugadores", editJugadorId),
        jugadorForm
      );
      setEditJugadorId(null);
    } else {
      await addDoc(collection(db, "jugadores"), jugadorForm);
    }

    setJugadorForm({
      nombre: "",
      categoriaFronton: "",
      categoriaTrinquete: ""
    });

    fetchJugadores();
  };

  const handleJugadorEdit = (jugador) => {
    setEditJugadorId(jugador.id);
    setJugadorForm({
      nombre: jugador.nombre,
      categoriaFronton: jugador.categoriaFronton,
      categoriaTrinquete: jugador.categoriaTrinquete
    });
  };

  const handleJugadorDelete = async (id) => {
    if (confirm("¿Eliminar jugador?")) {
      await deleteDoc(doc(db, "jugadores", id));
      fetchJugadores();
    }
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-20">

      {/* ================= EVENTOS ================= */}
      <section>
        <h2 className="text-2xl font-black uppercase mb-6">
          Noticias / Eventos
        </h2>

        <form onSubmit={handleEventoSubmit} className="grid gap-4 mb-10">

          <input
            className="border p-2"
            placeholder="Título"
            value={eventoForm.titulo}
            onChange={e =>
              setEventoForm({ ...eventoForm, titulo: e.target.value })
            }
            required
          />

          <textarea
            className="border p-2"
            rows={5}
            placeholder="Descripción"
            value={eventoForm.descripcion}
            onChange={e =>
              setEventoForm({ ...eventoForm, descripcion: e.target.value })
            }
            required
          />

          <input
            className="border p-2"
            type="date"
            value={eventoForm.fecha}
            onChange={e =>
              setEventoForm({ ...eventoForm, fecha: e.target.value })
            }
            required
          />

          <input
            className="border p-2"
            type="url"
            placeholder="Link Google Sheets (opcional)"
            value={eventoForm.planilla}
            onChange={e =>
              setEventoForm({ ...eventoForm, planilla: e.target.value })
            }
          />

          <input
            className="border p-2"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setImagenesFiles(Array.from(e.target.files))
            }
          />

          {/* ✅ Preview imágenes existentes */}
          {imagenesExistentes.length > 0 && (
            <div>
              <p className="text-sm font-bold">Imágenes actuales</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {imagenesExistentes.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt=""
                      className="w-20 h-20 object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => eliminarImagenExistente(i)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Preview imágenes nuevas */}
          {imagenesFiles.length > 0 && (
            <div>
              <p className="text-sm font-bold">Nuevas imágenes</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {imagenesFiles.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-20 h-20 object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => eliminarImagenNueva(i)}
                      className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 text-xs rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={subiendo}
            className="bg-black text-white py-2 font-bold uppercase disabled:opacity-50"
          >
            {subiendo
              ? "Subiendo..."
              : editEventoId
              ? "Actualizar noticia"
              : "Publicar noticia"}
          </button>
        </form>

        {/* LISTADO EVENTOS */}
        <div className="space-y-4">
          {eventos.map(e => (
            <div key={e.id} className="border p-4">

              <p className="text-xs font-bold uppercase">
                {formatFecha(e.fecha)}
              </p>

              <p className="font-black text-lg">{e.titulo}</p>

              <p className="text-sm text-zinc-600 line-clamp-2">
                {e.descripcion}
              </p>

              {e.planilla && (
                <p className="text-xs text-blue-600 font-bold mt-1">
                  📊 Tiene planilla vinculada
                </p>
              )}

              {e.imagenes?.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {e.imagenes.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-16 h-16 object-cover border"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-4 mt-3">
                <button onClick={() => handleEventoEdit(e)}>
                  Editar
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleEventoDelete(e.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= JUGADORES ================= */}
      <section>
        <h2 className="text-2xl font-black uppercase mb-6">
          Jugadores
        </h2>

        <form
          onSubmit={handleJugadorSubmit}
          className="grid md:grid-cols-4 gap-4 mb-10"
        >
          <input
            className="border p-2"
            placeholder="Nombre"
            value={jugadorForm.nombre}
            onChange={e =>
              setJugadorForm({ ...jugadorForm, nombre: e.target.value })
            }
            required
          />

          <input
            className="border p-2"
            placeholder="Categoría Frontón"
            value={jugadorForm.categoriaFronton}
            onChange={e =>
              setJugadorForm({
                ...jugadorForm,
                categoriaFronton: e.target.value
              })
            }
            required
          />

          <input
            className="border p-2"
            placeholder="Categoría Trinquete"
            value={jugadorForm.categoriaTrinquete}
            onChange={e =>
              setJugadorForm({
                ...jugadorForm,
                categoriaTrinquete: e.target.value
              })
            }
            required
          />

          <button className="bg-black text-white font-bold">
            {editJugadorId ? "Actualizar" : "Agregar"}
          </button>
        </form>

        <ul className="space-y-3">
          {jugadores.map(j => (
            <li
              key={j.id}
              className="border p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{j.nombre}</p>
                <p className="text-sm">
                  Frontón: {j.categoriaFronton} | Trinquete: {j.categoriaTrinquete}
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleJugadorEdit(j)}>
                  Editar
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleJugadorDelete(j.id)}
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}