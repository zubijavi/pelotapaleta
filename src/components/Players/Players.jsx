import { useEffect, useState, useMemo } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jugadores"));
        const playersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlayers(playersData);
      } catch (error) {
        console.error("Error obteniendo jugadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // ✅ Orden + filtro memoizado
  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) =>
        player.nombre?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        (a.nombre || "").localeCompare(b.nombre || "", "es", {
          sensitivity: "base",
        })
      );
  }, [players, search]);

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
      <div className="p-8 max-w-350 mx-auto w-full">
        
        {/* Heading + Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Jugadores federados
            </h2>
            <p className="text-slate-500 dark:text-[#9abcb7]">
              {filteredPlayers.length} registros.
            </p>
          </div>

          {/* ✅ Barra de búsqueda */}
          <div className="w-full md:w-80">
            <div className="relative">
                    <input
                type="text"
                placeholder="Buscar jugador..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  h-10
                  bg-white
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl
                  pl-10
                  pr-4
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/40
                "
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1b2826]/30 rounded-2xl border border-slate-200 dark:border-[#395651] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1b2826] border-b">
                  <th className="px-6 py-4 text-xs font-black uppercase">Nombre</th>
                  <th className="px-6 py-4 text-xs font-black uppercase">Frontón</th>
                  <th className="px-6 py-4 text-xs font-black uppercase">Trinquete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-[#395651]/50">
                
                {loading && (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center">
                      Cargando jugadores...
                    </td>
                  </tr>
                )}

                {!loading && filteredPlayers.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center">
                      No se encontraron jugadores.
                    </td>
                  </tr>
                )}

                {filteredPlayers.map((player) => (
                  <tr
                    key={player.id}
                    className="group hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold">
                        {player.nombre}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold">
                        {player.categoriaFronton || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                        {player.categoriaTrinquete || "-"}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Players;