import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function Footer() {

  const telefono = "5493413354935"
  const mensajeWhatsapp = "Hola! Quiero hacer una consulta desde la web."

  const form = useRef()
  const [enviando, setEnviando] = useState(false)

  const enviarEmail = (e) => {
    e.preventDefault()

    setEnviando(true)

    emailjs
      .sendForm(
        "service_krcvf27",
        "template_dsjtoku",
        form.current,
        "8Gr7R_EpXExmBvjCo"
      )
      .then(
        () => {
          alert("Mensaje enviado correctamente")
          form.current.reset()
          setEnviando(false)
        },
        (error) => {
          alert("Error al enviar el mensaje")
          console.log(error)
          setEnviando(false)
        }
      )
  }

  return (
    <footer id="footer" className="bg-black text-white py-10 lg:pt-6 pb-6">

      <div className="container mx-auto px-4 max-w-4xl pt-6">

        <div className="mb-10 text-center uppercase text-3xl flex justify-center gap-10">
          <h2>Contacto</h2>

          <a
            href={`https://wa.me/${telefono}?text=${encodeURIComponent(mensajeWhatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20zm4.3-5.5c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1s-.6.8-.7.9c-.1.1-.3.2-.5.1s-1-.4-1.9-1.2c-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.3.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.3c.1.1 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.1 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z"/>
            </svg>
          </a>
        </div>

        {/* FORMULARIO */}
        <form ref={form} onSubmit={enviarEmail} className="space-y-4 mb-12">

          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm"
          />

          <input
            type="text"
            name="user_contact"
            placeholder="Email o Teléfono"
            required
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm"
          />

          <textarea
            name="message"
            placeholder="Mensaje"
            rows="4"
            required
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm"
          ></textarea>

          <button
            type="submit"
            disabled={enviando}
            className="cursor-pointer w-full bg-gray-200 text-black py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-300 transition"
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>

        </form>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Rosario Pelota Paleta.
      </div>

    </footer>
  )
}