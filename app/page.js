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

      {/* FRANJA SUPERIOR */}
      <div className="overflow-hidden bg-black text-white border-b border-white/10">
        <div className="relative flex whitespace-nowrap py-2 text-[11px] md:text-xs uppercase tracking-[0.22em]">
          <div className="animate-[marquee_20s_linear_infinite] flex shrink-0 items-center gap-10 pr-10">
            <span>
              Envíos gratis en Bucaramanga y área metropolitana
            </span>

            <span className="text-white/40">•</span>

            <span>
              Pago contra entrega
            </span>

            <span className="text-white/40">•</span>

            <span>
              Envíos gratis en Bucaramanga y área metropolitana
            </span>

            <span className="text-white/40">•</span>

            <span>
              Pago contra entrega
            </span>
          </div>

          <div
            aria-hidden="true"
            className="animate-[marquee_20s_linear_infinite] flex shrink-0 items-center gap-10 pr-10"
          >
            <span>
              Envíos gratis en Bucaramanga y área metropolitana
            </span>

            <span className="text-white/40">•</span>

            <span>
              Pago contra entrega
            </span>

            <span className="text-white/40">•</span>

            <span>
              Envíos gratis en Bucaramanga y área metropolitana
            </span>

            <span className="text-white/40">•</span>

            <span>
              Pago contra entrega
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_20s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>

      {/* NAVEGACIÓN */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/10 bg-[#f7f3ee]/95">
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
          <a href="#inicio" className="hover:opacity-50 transition">
            Inicio
          </a>

          <a href="#catalogo" className="hover:opacity-50 transition">
            Catálogo
          </a>

          <a href="#nosotros" className="hover:opacity-50 transition">
            Nosotros
          </a>

          <a href="#contacto" className="hover:opacity-50 transition">
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

      {/* HERO */}
      <section
        id="inicio"
        className="flex items-center justify-center px-6 py-16 md:py-20"
      >
        <div className="max-w-4xl text-center">

          <div className="mb-6 flex justify-center">
            <img
              src="/logo-fullsense.png"
              alt="Fullsense"
              className="h-20 md:h-24 w-auto object-contain opacity-90"
            />
          </div>

          <p className="mb-5 text-xs md:text-sm uppercase tracking-[0.4em] text-black/45">
            Perfumería de diseñador & árabe
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Una fragancia.
            <br />
            Una identidad.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-black/60">
            Descubre una selección de perfumes pensados para expresar
            tu estilo, personalidad y esencia.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-black px-8 py-4 text-sm font-medium text-white hover:scale-[1.03] transition"
            >
              Explorar catálogo
            </a>

            <a
              href="#nosotros"
              className="rounded-full border border-black/20 px-8 py-4 text-sm hover:border-black transition"
            >
              Conocer Fullsense
            </a>
          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="border-y border-black/10 bg-white/40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3">

          <div className="py-9 md:pr-8 md:border-r border-black/10">
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Entrega
            </p>

            <h3 className="mt-3 text-lg font-semibold">
              Envíos gratis
            </h3>

            <p className="mt-2 text-sm leading-6 text-black/55">
              En Bucaramanga y área metropolitana.
            </p>
          </div>

          <div className="py-9 md:px-8 border-t md:border-t-0 md:border-r border-black/10">
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Compra segura
            </p>

            <h3 className="mt-3 text-lg font-semibold">
              Pago contra entrega
            </h3>

            <p className="mt-2 text-sm leading-6 text-black/55">
              Recibe tu perfume y paga al momento de la entrega.
            </p>
          </div>

          <div className="py-9 md:pl-8 border-t md:border-t-0">
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Asesoría
            </p>

            <h3 className="mt-3 text-lg font-semibold">
              Atención personalizada
            </h3>

            <p className="mt-2 text-sm leading-6 text-black/55">
              Te ayudamos a encontrar la fragancia ideal por WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORÍAS + CATÁLOGO */}
      <ProductCatalog perfumes={perfumes} />

      {/* NOSOTROS */}
      <section
        id="nosotros"
        className="bg-[#111111] text-white px-6 md:px-12 py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.4fr_0.6fr] gap-14 lg:gap-24 items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              Nuestra filosofía
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.04] tracking-tight">
              El perfume no es solo un aroma.
              <br />
              Es parte de tu identidad.
            </h2>
          </div>

          <div className="lg:pb-2">
            <div className="w-10 h-px bg-white/30 mb-7" />

            <p className="text-lg leading-8 text-white/60">
              En Fullsense seleccionamos fragancias para diferentes
              personalidades, estilos y momentos.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/40">
              Nuestra idea es simple: ayudarte a encontrar un perfume
              que no solo huela bien, sino que se sienta tuyo.
            </p>

            <a
              href="#catalogo"
              className="inline-flex mt-8 text-sm border-b border-white/40 pb-1 hover:border-white transition"
            >
              Descubrir perfumes →
            </a>
          </div>

        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="px-6 md:px-12 py-24 md:py-28 text-center"
      >
        <div className="max-w-3xl mx-auto">

          <p className="text-xs uppercase tracking-[0.35em] text-black/40">
            Atención personalizada
          </p>

          <h2 className="mt-5 text-4xl md:text-5xl font-semibold">
            ¿Buscas tu próxima fragancia?
          </h2>

          <p className="mt-6 text-lg leading-8 text-black/60">
            Escríbenos por WhatsApp para consultar disponibilidad,
            precios o recibir ayuda para elegir tu perfume.
          </p>

          <a
            href="https://wa.me/573151878609?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20perfumes%20de%20Fullsense."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-9 rounded-full bg-black px-8 py-4 text-sm font-medium text-white hover:scale-[1.03] transition"
          >
            Hablar por WhatsApp
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 md:px-12 pt-14 pb-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <a href="#inicio" className="inline-flex items-center gap-3">
                <img
                  src="/logo-fullsense.png"
                  alt="Logo Fullsense"
                  className="h-12 w-auto object-contain"
                />

                <div>
                  <p className="font-semibold tracking-[0.18em] uppercase">
                    Fullsense
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Perfumería
                  </p>
                </div>
              </a>

              <p className="mt-5 max-w-xs text-sm leading-6 text-black/50">
                Perfumes que dejan huella.
                Una fragancia. Una identidad.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/35">
                Navegación
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a href="#inicio" className="hover:opacity-50 transition">
                  Inicio
                </a>

                <a href="#catalogo" className="hover:opacity-50 transition">
                  Catálogo
                </a>

                <a href="#nosotros" className="hover:opacity-50 transition">
                  Nosotros
                </a>

                <a href="#contacto" className="hover:opacity-50 transition">
                  Contacto
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/35">
                Ubicación
              </p>

              <div className="mt-5 text-sm leading-7 text-black/55">
                <p>Bucaramanga, Santander</p>
                <p>Envíos gratis en Bucaramanga</p>
                <p>y área metropolitana.</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/35">
                Contacto
              </p>

              <a
                href="https://wa.me/573151878609?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20perfumes%20de%20Fullsense."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-5 text-sm border-b border-black/30 pb-1 hover:border-black transition"
              >
                WhatsApp →
              </a>

              <p className="mt-4 text-sm text-black/45">
                Pago contra entrega disponible.
              </p>
            </div>

          </div>

          <div className="mt-14 pt-7 border-t border-black/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-black/40">
            <p>
              © 2026 Fullsense Perfumería
            </p>

            <p>
              Bucaramanga, Colombia
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}