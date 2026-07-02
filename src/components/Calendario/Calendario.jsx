export default function Calendario() {
  const datos = [
    { categoria: "Segunda", trinqueteFecha: "19-sept", trinquete: "Centro Castellano (Santa Fe)", frontonFecha: "5-sept", fronton: "Huracán Los Quirquinchos" },
    { categoria: "Tercera", trinqueteFecha: "8-ago", trinquete: "Huracán", frontonFecha: "19-sept", fronton: "Fábrica de Armas" },
    { categoria: "Cuarta “A”", trinqueteFecha: "22-ago", trinquete: "Gimnasia y Esgrima", frontonFecha: "5-sept", fronton: "Central Córdoba" },
    { categoria: "Cuarta “B”", frontonFecha: "22-sept", fronton: "Zazpirak Bat" },
    { categoria: "Damas “A”", frontonFecha: "24-oct", fronton: "Remeros" },
    { categoria: "Damas “B”", frontonFecha: "24-oct", fronton: "Central Cordoba" },
  ];

  // Transformamos en una lista unificada
  const eventos = [
    ...datos.filter(d => d.trinquete).map(d => ({
      categoria: d.categoria,
      fecha: d.trinqueteFecha,
      lugar: d.trinquete,
      tipo: "Trinquete"
    })),
    ...datos.filter(d => d.fronton).map(d => ({
      categoria: d.categoria,
      fecha: d.frontonFecha,
      lugar: d.fronton,
      tipo: "Frontón"
    }))
  ];

  // Ordenamos por fecha (simplificado, si querés más precisión podés parsear a Date)
  const ordenados = eventos.sort((b, a) => a.fecha.localeCompare(b.fecha));

  return (
    <div className="p-6 space-y-8 bg-linear-to-r from-slate-100 to-zinc-300">
      <h1 className="text-5xl text-green-900 text-center mb-6 font-['Helvetica'] uppercase">Clausura 2026</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {ordenados.map((ev, i) => (
          <div key={i} className="flex items-center border rounded-lg shadow-sm p-4 bg-gray-50">
            {/* Etiqueta lateral */}
            <div className={`w-20 text-center font-bold text-white py-2 rounded-l-lg ${
              ev.tipo === "Trinquete" ? "bg-green-900" : "bg-blue-900"
            }`}>
              {ev.tipo}
            </div>
            {/* Contenido */}
            <div className="ml-4 text-left">
              <p className="font-bold text-xl text-gray-700">{ev.categoria}</p>
              <p className="text-sm text-gray-600">Fecha: {ev.fecha}</p>
              <p className="text-sm text-gray-600">Lugar: {ev.lugar}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
