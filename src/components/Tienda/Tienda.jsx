import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import productoDefault from "../../assets/logo.png";
import logoTienda from "../../assets/logoTienda.jpg";

const productosMock = [
    {
        id: "mock-1",
        nombre: "Remera Oficial",
        precio: 15000,
        categoria: "Indumentaria",
        imagenes: ["https://dcdn-us.mitiendanube.com/stores/213/643/products/camiseta-pelota-paleta-art-5027-a-0815d2bd34b16be5b917541436936396-480-0.webp"],
    },
    {
        id: "mock-2",
        nombre: "Pelota de Frontón",
        precio: 22000,
        categoria: "Equipamiento",
        imagenes: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcROjBQ2WLrKO0cCVJIYlbbg7v01AnefB2mvaM5woS9jQAoJ0f3A9zBtFpDRFI58e_2dWqlyWZ6duCM2X5uveherNpyNnsXXv-OuAGuDU3LrhgAytF6gMgH6QFY4l6IGnWHPRUnU2A&usqp=CAc"],
    },
    {
        id: "mock-3",
        nombre: "Protectores",
        precio: 32000,
        categoria: "Equipamiento",
        imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/a34d4deea9897f9d9fa9a10682233e5b6583e49b3cbee57094a92085a26226dc270088.jpg"],
    },
    {
        id: "mock-4",
        nombre: "Guantes Profesionales",
        precio: 18000,
        categoria: "Equipamiento",
        imagenes: ["https://guastavino.com.ar/wp-content/uploads/2025/07/bolso.png"],
    },
];

const Tienda = () => {
    const [productos, setProductos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    const fetchProductos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));

            const productosArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Si Firebase está vacío → usar mock
            if (productosArray.length === 0) {
                setProductos(productosMock);
            } else {
                setProductos(productosArray);
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);

            // Fallback total → mock
            setProductos(productosMock);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleVerMas = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <main className="w-full px-4 lg:px-8">
            <div className="flex justify-center items-center">
                <img
                    src={logoTienda}
                    alt="Logo tienda"
                    className="h-48 lg:h-36 w-auto object-contain"
                />
            </div>

            {productos.length === 0 ? (
                <p className="text-center text-zinc-500">
                    No hay productos disponibles.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {productos.slice(0, visibleCount).map((producto) => (
                            <div
                                key={producto.id}
                                className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
                            >
                                <div className="aspect-square bg-zinc-100 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={producto.imagenes?.[0] || productoDefault}
                                        alt={producto.nombre}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-3">
                                    <h3 className="font-bold text-sm lg:text-base leading-snug">
                                        {producto.nombre}
                                    </h3>

                                    <p className="text-sm text-zinc-600 font-semibold">
                                        ${producto.precio}
                                    </p>

                                    {producto.categoria && (
                                        <p className="text-xs text-zinc-400 uppercase">
                                            {producto.categoria}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < productos.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleVerMas}
                                className="text-sm font-bold uppercase text-blue-600 hover:text-blue-800"
                            >
                                Ver más
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Tienda;