export default function Calendario() {
  const datos = [
    { categoria: "Segunda", trinqueteFecha: "19-sept", trinquete: "C. Castellano", frontonFecha: "5-sept", fronton: "Huracán LQ" },
    { categoria: "Tercera", trinqueteFecha: "8-ago", trinquete: "Huracan", frontonFecha: "19-sept", fronton: "Fábrica DH" },
    { categoria: "Cuarta “A”", trinqueteFecha: "22-ago", trinquete: "Gimnasia ROS", frontonFecha: "5-sept", fronton: "C. Córdoba" },
    { categoria: "Cuarta “B”",  frontonFecha: "22-sept", fronton: "Zapla Brk" },
    { categoria: "Damas “A”", frontonFecha: "24-oct", fronton: "Remeros" },
    { categoria: "Damas “B”",  frontonFecha: "24-oct", fronton: "Central Cordoba" },
  ];

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">Clausura 2026</h1>
      <table className="min-w-full border border-gray-300 text-sm text-gray-800 rounded-lg shadow-md">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Fecha (Trinquete)</th>
            <th className="px-4 py-2 text-left">Trinquete</th>
            <th className="px-4 py-2 text-left">Fecha (Frontón)</th>
            <th className="px-4 py-2 text-left">Frontón</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, i) => (
            <tr key={i} className={`border-t ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
              <td className="px-4 py-2">{fila.categoria}</td>
              <td className="px-4 py-2">{fila.trinqueteFecha}</td>
              <td className="px-4 py-2">{fila.trinquete}</td>
              <td className={`px-4 py-2 ${fila.destacado ? "text-red-600 font-semibold" : ""}`}>{fila.frontonFecha}</td>
              <td className={`px-4 py-2 ${fila.destacado ? "text-red-600 font-semibold" : ""}`}>{fila.fronton}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
