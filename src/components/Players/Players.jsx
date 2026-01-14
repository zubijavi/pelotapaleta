import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
      {/* TopNav */}
      {/* <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search players by name, ID or license..."
              className="w-full h-11 bg-slate-100 dark:bg-slate-800/50 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </header> */}

      {/* Content */}
      <div className="p-8 max-w-350 mx-auto w-full">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Jugadores federados
            </h2>
            <p className="text-slate-500 dark:text-[#9abcb7]">
              {players.length} registros.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1b2826]/30 rounded-2xl border border-slate-200 dark:border-[#395651] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1b2826] border-b">
                  <th className="px-6 py-4 text-xs font-black uppercase">Nombre</th>
                  <th className="px-6 py-4 text-xs font-black uppercase">
                    Frontón
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase">
                    Trinquete
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase">
                    Estado
                  </th>
                  {/* <th className="px-6 py-4 text-xs font-black uppercase text-right">
                    Actions
                  </th> */}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-[#395651]/50">
                {loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      Cargando jugadores...
                    </td>
                  </tr>
                )}

                {!loading && players.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      No hay jugadores cargados.
                    </td>
                  </tr>
                )}

                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="group hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full border bg-slate-200 flex items-center justify-center font-bold">
                          {player.nombre?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">
                            {player.nombre}
                          </p>
                          {/* <p className="text-xs text-slate-500">
                            ID: {player.id}
                          </p> */}
                        </div>
                      </div>
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

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-xs">Activo</span>
                      </div>
                    </td>

                    {/* <td className="px-6 py-4 text-right">
                      <button className="text-xs font-bold text-primary hover:underline">
                        View Profile
                      </button>
                    </td> */}
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
