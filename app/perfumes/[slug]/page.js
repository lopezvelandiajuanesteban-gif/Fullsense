 "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function PerfumePage() {
  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("PRODUCTS")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error cargando perfume:", error);
        setErrorMessage("No se encontró este perfume.");
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
        <p className="text-black/50">Cargando perfume...</p>
      </main>
    );
  }

  if (!product || errorMessage) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Perfume no encontrado
          </h1>

          <p className="mt-3 text-black/50">
            Este producto no está disponible.
          </p>

          <a
            href="/"
            className="inline-flex mt-6 rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            Volver al catálogo
          </a>
        </div>
      </main>
    );
  }

  const price = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, estoy interesado en ${product.name} de ${product.brand}, ${product.size_ml} ml, precio ${price}.`
  );

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
      <header className="px-6 py-5 md:px-12 border-b border-black/10 bg-white">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo-fullsense.png"
            alt="Fullsense"
            className="h-11 w-auto object-contain"
          />

          <div>
            <p className="font-semibold tracking-[0.18em] uppercase">
              Fullsense
            </p>

            <p className="text-xs text-black/40">
              Perfumería
            </p>
          </div>
        </a>
      </header>

      <section className="px-6 md:px-12 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <a
            href="/"
            className="text-sm text-black/50 hover:text-black transition"
          >
            ← Volver al catálogo
          </a>

          <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="bg-white rounded-3xl border border-black/10 p-8 md:p-12 flex items-center justify-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full max-w-md h-[420px] object-contain"
              />
            </div>

            <div className="lg:pt-4">
              <p
                translate="no"
                className="notranslate text-sm uppercase tracking-[0.25em] text-black/40"
              >
                {product.brand}
              </p>

              <h1
                translate="no"
                className="notranslate mt-3 text-4xl md:text-5xl font-semibold leading-tight"
              >
                {product.name}
              </h1>

              <p className="mt-5 text-3xl font-semibold">
                {price}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white border border-black/10 px-4 py-2 text-sm">
                  {product.type}
                </span>

                <span className="rounded-full bg-white border border-black/10 px-4 py-2 text-sm">
                  {product.category}
                </span>

                <span className="rounded-full bg-white border border-black/10 px-4 py-2 text-sm">
                  {product.size_ml} ml
                </span>
              </div>

              <div className="mt-8">
                <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                  Descripción
                </p>

                <p className="mt-3 text-lg leading-8 text-black/70">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-white border border-black/10 p-5">
                <p className="font-medium">
                  📍 Fullsense — Bucaramanga
                </p>

                <p className="mt-2 text-sm text-black/60">
                  Envíos gratis en Bucaramanga y área metropolitana.
                </p>
              </div>

              <div className="mt-6">
                {product.available ? (
                  <p className="text-green-700 font-medium">
                    Disponible
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">
                    Agotado
                  </p>
                )}
              </div>

              {product.available && (
                <a
                  href={`https://wa.me/573151878609?text=${mensajeWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 rounded-full bg-black px-6 py-4 text-center text-sm font-medium text-white hover:bg-black/80 transition"
                >
                  Consultar por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}