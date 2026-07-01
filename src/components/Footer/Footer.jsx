import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function Footer() {
  const form = useRef()
  const [enviando, setEnviando] = useState(false)

  const enviarEmail = (e) => {
    e.preventDefault()
    setEnviando(true)

    emailjs
      .sendForm("service_krcvf27", "template_dsjtoku", form.current, "8Gr7R_EpXExmBvjCo")
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
    <footer id="footer" className="bg-zinc-900 text-zinc-200 py-12 px-6">
      <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8">
        
        {/* Título */}
        <h2 className="text-2xl font-bold border-b border-green-500 pb-2">
          Contacto
        </h2>

        {/* FORMULARIO */}
        <form
          ref={form}
          onSubmit={enviarEmail}
          className="w-full max-w-md space-y-4 bg-zinc-800 p-6 rounded-lg shadow-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="user_contact"
            placeholder="Email o Teléfono"
            required
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="message"
            placeholder="Mensaje"
            rows="4"
            required
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <button
            type="submit"
            disabled={enviando}
            className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md uppercase text-xs font-bold tracking-widest transition"
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-700 mt-12 pt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Rosario Pelota Paleta. Todos los derechos reservados.
      </div>
    </footer>
  )
}
