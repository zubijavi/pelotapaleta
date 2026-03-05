import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import productoDefault from "../../assets/logo.png";
// import logoTienda from "../../assets/logoTienda.jpg";

const productosMock = [
  // =========================
  // PALETAS
  // =========================
  {
    id: "paleta-1",
    nombre: "ELITE",
    precio: 66000,
    categoria: "Paletas",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/f76f7c1b1da0ec8f84fb200b07fc39c9fd1501365a173f978671d2b01b71232e270088.jpg"],
  },
  {
    id: "paleta-2",
    nombre: "THUNDER",
    precio: 66000,
    categoria: "Paletas",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/878415826d28b8fb925dd936c5f3bbfc46a0ab2bb222c304cfc10a1815c2f5ba270088.png"],
  },
  {
    id: "paleta-3",
    nombre: "NEXUS FRONTON O TRINQUETE",
    precio: 115000,
    categoria: "Paletas",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/4f6eb527ec3cbc4428fd8df3726f8af1c8d609edbee787a9e34d7981b9c2b2e7270088.png","https://d22fxaf9t8d39k.cloudfront.net/e76f487479e4467c9999d49a57be49b4e8d11b8aa4d16e2003bf329082ea8e66270088.png"],
  },
  {
    id: "paleta-4",
    nombre: "METAL PRO",
    precio: 135000,
    categoria: "Paletas",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/bddc5681a00cb3961e99a71e8dee3f3511e07762366d3cffc2af47a4b7d0653a270088.png"],
  },
  {
    id: "paleta-5",
    nombre: "THUNDER TRIPLE CARBONO 18K",
    precio: 145000,
    categoria: "Paletas",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/e6f165536a7fa72b917e160bf899eb947722c0f18250848fd5c75ae0537fe5aa270088.png"],
  },
  {
    id: "paleta-6",
    nombre: "BULL PRINCE LUXURY",
    precio: 210000,
    categoria: "Paletas",
    imagenes: ["https://guastavino.com.ar/wp-content/uploads/2024/06/bull_prince_2.png"],
  },

  // =========================
  // BOLSOS
  // =========================
  {
    id: "bolso-1",
    nombre: "Bolso Paletero Dabber (3 Compartimentos)",
    precio: 77000,
    categoria: "Bolsos",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/67fdeb3e1244d78f532c011217fe1ba54df5ac73197f719b93ba67b13334890b270088.jpg"],
  },
  {
    id: "bolso-3",
    nombre: "Mochila Paletera",
    precio: 50000,
    categoria: "Bolsos",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/d4294acba230984de213b61beb6ac7676973c41b6e22584098df50a786980009270088.png"],
  },

  // =========================
  // INDUMENTARIA
  // =========================
//   {
//     id: "ind-1",
//     nombre: "Remera Dabber",
//     precio: 26000,
//     categoria: "Indumentaria",
//     imagenes: ["/img/productos/remera-dabber.jpg"],
//   },
//   {
//     id: "ind-2",
//     nombre: "Remera Dabber Metal",
//     precio: 30000,
//     categoria: "Indumentaria",
//     imagenes: ["/img/productos/remera-metal.jpg"],
//   },
//   {
//     id: "ind-3",
//     nombre: "Remeras Alfa / Crazzy Twin",
//     precio: 40000,
//     categoria: "Indumentaria",
//     imagenes: ["/img/productos/remera-alfa.jpg"],
//   },
//   {
//     id: "ind-4",
//     nombre: "Chomba Alfa",
//     precio: 45000,
//     categoria: "Indumentaria",
//     imagenes: ["/img/productos/chomba-alfa.jpg"],
//   },

  // =========================
  // ACCESORIOS
  // =========================
  {
    id: "acc-1",
    nombre: "Gafas Dabber",
    precio: 27000,
    categoria: "Accesorios",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/a34d4deea9897f9d9fa9a10682233e5b6583e49b3cbee57094a92085a26226dc270088.jpg"],
  },
  {
    id: "acc-2",
    nombre: "Funda Paletera",
    precio: 32000,
    categoria: "Accesorios",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/54330489611ed09b93eb9e6d12cb10c1e5db542860c6303b607794fe10bb7884270088.png"],
  },
  {
    id: "acc-3",
    nombre: "Overgrip Dabber",
    precio: 4000,
    categoria: "Accesorios",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/091db614fb59d54b13404d8565b5997af1c948c85ce7599be6a0f0c5d7a45c62270088.jpg"],
  },
  {
    id: "acc-4",
    nombre: "Grip de Toalla",
    precio: 2500,
    categoria: "Accesorios",
    imagenes: ["https://d22fxaf9t8d39k.cloudfront.net/1dd0d11f3af950ce74963352f6a02fb80c030902ec6de85804a51074cc3b34e8270088.jpg"],
  },
];

const Tienda = () => {
    const [productos, setProductos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(15);

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
        <main className="w-full px-4 ">
            <div className="mb-18 flex justify-center items-center">
                <h1 className="text-4xl">La Tienda del Pelotari</h1>
                {/* <img
                    src={logoTienda}
                    alt="Logo tienda"
                    className="h-48 lg:h-36 w-auto object-contain"
                /> */}
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

                                    {/* {producto.categoria && (
                                        <p className="text-xs text-zinc-400 uppercase">
                                            {producto.categoria}
                                        </p>
                                    )} */}
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