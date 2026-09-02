const perfumes = [
  {
    name: "9 PM Night Out",
    brand: "Afnan",
    price: "$300.000",
    category: "Hombre",
    type: "Árabe",
    image: "/perfumes/9pm-night-out.png",
    description:
      "Una fragancia intensa, dulce y sofisticada, ideal para la noche y ocasiones especiales.",
  },
  {
    name: "Stronger With You Intensely",
    brand: "Emporio Armani",
    price: "$550.000",
    category: "Hombre",
    type: "Diseñador",
    image: "/perfumes/stronger-with-you-intensely.png",
    description:
      "Una fragancia cálida, intensa y envolvente, perfecta para destacar y dejar huella.",
  },
  {
    name: "Yum Yum",
    brand: "Armaf",
    price: "$260.000",
    category: "Mujer",
    type: "Árabe",
    image: "/perfumes/yum-yum.png",
    description:
      "Una fragancia dulce, frutal y floral con un carácter femenino y elegante.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-black/10">
        <div className="text-xl font-bold tracking-[0.25em]">
          Fullsense
        </div>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#inicio" className="hover:opacity-60 transition">
            Inicio
          </a>
          <a href="#catalogo" className="hover:opacity-60 transition">
            Catálogo
          </a>
          <a href="#nosotros" className="hover:opacity-60 transition">
            Nosotros
          </a>
          <a href="#contacto" className="hover:opacity-60 transition">
            Contacto
          </a>
        </div>

        <a
          href="#catalogo"
          className="rounded-full border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Ver perfumes
        </a>
      </nav>

      <section
        id="inicio"
        className="min-h-[75vh] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-black/50">
            Perfumería
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Una fragancia.
            <br />
            Una identidad.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-black/60">
            Descubre perfumes originales de diseñador y perfumes árabes
            seleccionados para encontrar una fragancia que hable de ti.
          </p>

          <a
            href="#catalogo"
            className="inline-block mt-10 rounded-full bg-black px-8 py-4 text-sm font-medium text-white hover:scale-105 transition"
          >
            Explorar catálogo
          </a>
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 border-y border-black/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="py-6">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-medium">Diseñador</p>
          </div>

          <div className="py-6">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-medium">Árabes</p>
          </div>

          <div className="py-6">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-medium">Masculinos</p>
          </div>

          <div className="py-6">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-medium">Femeninos</p>
          </div>
        </div>
      </section>

      <section id="catalogo" className="px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">
              Selección
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-semibold">
              Nuestros perfumes
            </h2>
          </div>

          <p className="max-w-md text-black/60">
            Una selección de fragancias para diferentes estilos,
            personalidades y ocasiones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {perfumes.map((perfume) => (
            <article
              key={perfume.name}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl transition"
            >
              <div className="h-80 bg-[#e9e1d7] flex items-center justify-center p-6">
                <img
                  src={perfume.image}
                  alt={`${perfume.name} de ${perfume.brand}`}
                  className="h-full w-full object-contain group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-black/40">
                      {perfume.type}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      {perfume.name}
                    </h3>

                    <p className="mt-1 text-sm text-black/50">
                      {perfume.brand}
                    </p>
                  </div>

                  <p className="font-semibold whitespace-nowrap">
                    {perfume.price}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-black/60">
                  {perfume.description}
                </p>

                <p className="mt-4 text-xs uppercase tracking-wider text-black/40">
                  {perfume.category}
                </p>

                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 rounded-full bg-black px-5 py-3 text-center text-sm text-white hover:bg-black/80 transition"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="nosotros"
        className="bg-black text-white px-6 md:px-12 py-24"
      >
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Nuestra filosofía
          </p>

          <h2 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight">
            El perfume no es solo un aroma.
            <br />
            Es parte de tu identidad.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Queremos ayudarte a encontrar fragancias que se adapten a tu
            personalidad, tu estilo y esos momentos que quieres recordar.
          </p>
        </div>
      </section>

      <section
        id="contacto"
        className="px-6 md:px-12 py-24 text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">
          ¿Tienes alguna pregunta?
        </p>

        <h2 className="mt-4 text-4xl font-semibold">
          Hablemos.
        </h2>

        <p className="mt-5 text-black/60">
          Escríbenos por WhatsApp para consultar disponibilidad,
          precios o realizar tu pedido.
        </p>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 rounded-full bg-black px-8 py-4 text-sm text-white hover:scale-105 transition"
        >
          WhatsApp
        </a>
      </section>

      <footer className="border-t border-black/10 px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-black/50">
        <p>© 2026 Fullsense Perfumería</p>
        <p>Perfumes que dejan huella.</p>
      </footer>
    </main>
  );
}