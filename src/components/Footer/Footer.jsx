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
    <footer id="footer" className="bg-zinc-900 text-zinc-200 py-6 px-24">


      {/* COPYRIGHT */}
      <div className="border-t border-zinc-700 mt-12 pt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Rosario Pelota Paleta. Todos los derechos reservados.
      </div>
    </footer>
  )
}
