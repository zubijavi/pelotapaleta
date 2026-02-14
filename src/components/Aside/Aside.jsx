import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import noticiaDefault from "../../assets/logo.png";

const Aside = () => {
    const [eventos, setEventos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString("es-AR");
    };

    useEffect(() => {
        const fetchEventos = async () => {
            const snapshot = await getDocs(collection(db, "eventos"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            setEventos(data);
        };

        fetchEventos();
    }, []);

    const handleVerMas = () => {
        setVisibleCount(prev => prev + 2);
    };

    return (
        <aside className="lg:col-span-2 sticky top-24 self-start flex flex-col gap-8">

            <h3 className="font-display font-black text-xl uppercase border-b-2 border-black pb-2">
                Últimas Noticias
            </h3>

            {eventos.slice(1, visibleCount + 1).map(evento => (

                <Link key={evento.id} to={`/noticia/${evento.id}`} className="flex gap-4">

                    <div className="w-24 h-24 bg-zinc-200 overflow-hidden">
                        <img
                            src={evento.imagenes?.[0] || noticiaDefault}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-xs text-zinc-500 uppercase">
                            {formatFecha(evento.fecha)}
                        </p>

                        <h4 className="font-bold text-sm">
                            {evento.titulo}
                        </h4>
                    </div>

                </Link>

            ))}

            {visibleCount < eventos.length - 1 && (
                <button
                    onClick={handleVerMas}
                    className="text-sm font-bold uppercase text-blue-600 self-start"
                >
                    Ver noticias anteriores
                </button>
            )}

        </aside>
    );
};

export default Aside;
