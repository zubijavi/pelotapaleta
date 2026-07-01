import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { createPortal } from "react-dom";


export default function ModalContacto({ cerrar }) {

  const form = useRef();
  const [enviando, setEnviando] = useState(false);


  const enviarEmail = (e) => {

    e.preventDefault();

    setEnviando(true);


    emailjs
      .sendForm(
        "service_krcvf27",
        "template_dsjtoku",
        form.current,
        "8Gr7R_EpXExmBvjCo"
      )
      .then(

        () => {

          alert("Mensaje enviado correctamente");

          form.current.reset();

          cerrar();

          setEnviando(false);

        },


        (error) => {

          console.log(error);

          alert("Error al enviar");

          setEnviando(false);

        }

      );

  };



  return createPortal(


    <div

      className="
        fixed
        inset-0
        bg-black/60
        z-50
        flex
        items-center
        justify-center
        px-4
        py-6
        overflow-y-auto
      "

      onClick={cerrar}

    >



      <div

        className="
          bg-zinc-900
          text-white
          rounded-xl
          p-6
          w-full
          max-w-md
          relative
          shadow-xl
        "

        onClick={(e)=>e.stopPropagation()}

      >



        <button

          onClick={cerrar}

          className="
            absolute
            right-4
            top-3
            text-xl
            cursor-pointer
          "

        >
          ✕
        </button>




        <h2 className="text-2xl font-bold text-center mb-6">
          Dejanos tu mensaje
        </h2>




        <form

          ref={form}

          onSubmit={enviarEmail}

          className="space-y-4"

        >



          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="w-full bg-zinc-700 rounded-md px-3 py-2"
          />



          <input
            type="text"
            name="user_contact"
            placeholder="Email o Teléfono"
            required
            className="w-full bg-zinc-700 rounded-md px-3 py-2"
          />



          <textarea

            name="message"

            placeholder="Mensaje"

            rows="5"

            required

            className="w-full bg-zinc-700 rounded-md px-3 py-2"

          />



          <button

            disabled={enviando}

            className="
              w-full
              bg-green-600
              hover:bg-green-700
              py-3
              rounded-md
              font-bold
            "

          >

            {enviando ? "Enviando..." : "Enviar"}

          </button>



        </form>


      </div>


    </div>,


    document.body

  );

}