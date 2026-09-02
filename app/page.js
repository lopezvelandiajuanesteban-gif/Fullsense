import { supabase } from "../lib/supabase";
import ProductCatalog from "./ProductCatalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("PRODUCTS")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error cargando productos:", error);
  }

  const perfumes = products ?? [];

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">

      {/* NAVEGACIÓN */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/10">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src="/logo-fullsense.png"
            alt="Logo Fullsense"
            className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase">
              Fullsense
            </span>

            <span className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-black/40">
              Perfumería
            </span>
          </div>
        </a>

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

      {/* INICIO */}
      <section
        id="inicio"
        className="min-h-[75vh] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/logo-fullsense.png"
              alt="Fullsense"
              className="h-20 md:h-24 w-auto object-contain opacity-90"
            />
          </div>

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

      {/* CATEGORÍAS + CATÁLOGO */}
      <ProductCatalog perfumes={perfumes} />

      {/* NOSOTROS */}
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

      {/* CONTACTO */}
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
          href="https://wa.me/573151878609?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20perfumes%20de%20Fullsense."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 rounded-full bg-black px-8 py-4 text-sm text-white hover:scale-105 transition"
        >
          WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/logo-fullsense.png"
              alt="Logo Fullsense"
              className="h-12 w-auto object-contain"
            />

            <div>
              <p className="font-semibold tracking-[0.18em] uppercase text-black">
                Fullsense
              </p>

              <p className="mt-1 text-xs text-black/40">
                Perfumes que dejan huella.
              </p>
            </div>
          </a>

          <div className="text-sm text-black/50 md:text-right">
            <p>© 2026 Fullsense Perfumería</p>
            <p className="mt-1">Una fragancia. Una identidad.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}