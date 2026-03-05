import { Link } from "react-router-dom"
import { useRef } from "react"
import emailjs from "@emailjs/browser"
import logo from "../../assets/logo.png"

export default function Footer() {

  const telefono = "5493413354935"
  const mensajeWhatsapp = "Hola! Quiero hacer una consulta desde la web."

  const form = useRef()

  const enviarEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        "service_krcvf27",     // service id
        "template_dsjtoku",    // template id
        form.current,
        "8Gr7R_EpXExmBvjCo"    // public key
      )
      .then(
        () => {
          alert("Mensaje enviado correctamente")
          form.current.reset()
        },
        (error) => {
          alert("Error al enviar el mensaje")
          console.log(error)
        }
      )
  }

  return (
    <footer id="footer" className="bg-black text-white py-36 lg:pt-6 pb-6 ">
      <div className="container mx-auto px-4 max-w-4xl pt-6">

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
            className="cursor-pointer w-full bg-white text-black py-3 uppercase text-xs font-bold tracking-widest"
          >
            Enviar
          </button>

        </form>

      </div>
    </footer>
  )
}