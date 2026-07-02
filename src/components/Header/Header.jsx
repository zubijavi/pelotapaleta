import { useState } from "react";
import { Link } from "react-router-dom";
import LogoTienda from "../../assets/logoTienda.jpg";
import pelotari from "../../assets/logoRectangular.png";
import ModalContacto from "../Contacto/ModalContacto";

export default function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [modalContacto, setModalContacto] = useState(false);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setMobileOpen(false);
  };


  return (

    <header className="sticky top-0 z-50 bg-linear-to-r from-slate-100 to-zinc-300 backdrop-blur-md border-b border-slate-400">

      <div className="container mx-auto px-4 lg:px-2">

        <div className="flex items-center justify-between">

          {/* Logo izquierdo */}

          {/* <Link
            to="/"
            onClick={scrollToTop}
            className="pl-20"
          > */}


            <img
              src={pelotari}
              className="
        h-24 
        lg:h-24
        object-contain
        scale-300
        z-10
        pl-12
        lg:pl-10
        pointer-events-none
      "
              alt="pelotari"
            />




          {/* </Link> */}

                   {/* Botón mobile */}

          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-14 h-14 flex items-center justify-around"
            >
              <span
                className={`
                absolute h-0.5 w-10 bg-black transition-all
                ${mobileOpen ? "rotate-45" : "-translate-y-2"}
                `}
              />
              <span
                className={`
                absolute h-0.5 w-10 bg-black transition-all
                ${mobileOpen ? "opacity-0" : ""}
                `}
              />

              <span
                className={`
                absolute h-0.5 w-10 bg-black transition-all
                ${mobileOpen ? "-rotate-45" : "translate-y-2"}
                `}
              />
            </button>
          </div>

          {/* Menu desktop */}

          <nav className="hidden md:flex">

            <ul className="flex gap-8 text-m tracking-widest uppercase font-['Helvetica']">
          
              {/* Inicio */}
              <li>

                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:opacity-70 transition"
                >
                  Inicio
                </Link>

              </li>

              {/* Calendario */}
              <li>

                <Link
                  to="/calendario"
                  onClick={scrollToTop}
                  className="hover:opacity-70 transition"
                >
                  Calendario
                </Link>
              </li>

              {/* Tienda */}
              {/* <li>

                <a
                  href="/tienda"
                  className="hover:opacity-70 transition"
                >
                  Tienda
                </a>

              </li> */}
              {/* Contacto */}
              <li>
                {/* BOTON MODAL */}
                <button
                  onClick={() => setModalContacto(true)}
                  className="cursor-pointer hover:opacity-70 transition uppercase"
                >
                  Contacto
                </button>
              </li>
            </ul>


          </nav>

        </div>

      </div>






      {/* MENU MOBILE */}

      <div
        className={`
        md:hidden overflow-hidden transition-all duration-500
        ${mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >


        <div className="border-t bg-linear-to-r from-slate-500 to-zinc-500 border-zinc-200 text-amber-50 font-['Helvetica']">


          <ul className="flex justify-evenly items-center py-4 uppercase">
            {/* Inicio */}
            <li>
              <Link
                to="/"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}

                className="text-xl cursor-pointer"
              >

                Inicio

              </Link>
            </li>

            {/* Calendario */}
            <li>
              <Link
                to="/calendario"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}

                className="text-xl cursor-pointer"
              >

                Calendario

              </Link>
            </li>

            {/* Contacto */}
            <li>
              <button
                onClick={() => {

                  setModalContacto(true);
                  setMobileOpen(false);

                }}

                className="text-xl cursor-pointer uppercase"

              >

                Contacto

              </button>


            </li>
            {/* Tienda */}
            {/* <li>

              <a
                href="/tienda"
                onClick={() => setMobileOpen(false)}
                className="
      flex
      items-center
      justify-center
      rounded-full
      overflow-hidden
      p-1
    "
              >

                <img
                  src={LogoTienda}
                  alt="tienda"
                  className="
        h-20
        w-20
        object-cover
        rounded-full
        scale-160
        cursor-pointer
      "
                />

              </a>

            </li> */}



          </ul>



        </div>


      </div>





      {/* MODAL CONTACTO */}

      {
        modalContacto && (

          <ModalContacto

            cerrar={() => setModalContacto(false)}

          />

        )
      }




    </header>


  );

}