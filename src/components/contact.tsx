import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      className="bg-neutral-950 py-20 px-6 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Hablamos?</h2>
        <p className="text-gray-400 text-lg mb-12">
          ¿Tienes preguntas, ideas o quieres colaborar? Estamos listos para ayudarte a optimizar tus rutas con inteligencia.
        </p>
        <form
          className="grid grid-cols-1 gap-6 max-w-xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert("¡Gracias por tu mensaje! 💚");
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            className="bg-neutral-800 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="bg-neutral-800 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Tu mensaje"
            rows={5}
            className="bg-neutral-800 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </motion.section>
  );
}
