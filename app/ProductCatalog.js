"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductCatalog({ perfumes }) {
  const [filtro, setFiltro] = useState("Todos");

  const categorias = [
    "Todos",
    "Diseñador",
    "Árabes",
    "Hombre",
    "Mujer",
  ];

  const perfumesFiltrados = perfumes.filter((perfume) => {
    if (filtro === "Todos") {
      return true;
    }

    if (filtro === "Diseñador") {
      return perfume.type?.toLowerCase() === "diseñador";
    }

    if (filtro === "Árabes") {
      return perfume.type?.toLowerCase() === "árabe";
    }

    if (filtro === "Hombre") {
      return perfume.category?.toLowerCase() === "hombre";
    }

    if (filtro === "Mujer") {
      return perfume.category?.toLowerCase() === "mujer";
    }

    return true;
  });

  return (
    <>
      <section className="px-6 md:px-12 py-12 border-y border-black/10">
        <div className="max-w-5xl mx-auto">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-black/40">
            Explora por categoría
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setFiltro(categoria)}
                className={`rounded-full px-5 py-3 text-sm transition ${
                  filtro === categoria
                    ? "bg-black text-white"
                    : "border border-black/15 bg-transparent text-black hover:border-black"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">
              {filtro === "Todos" ? "Selección" : filtro}
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

        {perfumesFiltrados.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium">
              No encontramos perfumes en esta categoría.
            </p>

            <button
              type="button"
              onClick={() => setFiltro("Todos")}
              className="mt-5 text-sm underline underline-offset-4 text-black/60 hover:text-black"
            >
              Ver todos los perfumes
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfumesFiltrados.map((perfume) => {
              const precioFormateado = new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(perfume.price);

              const mensajeWhatsApp = encodeURIComponent(
                `Hola, estoy interesado en ${perfume.name} de ${perfume.brand}, ${perfume.size_ml} ml, precio ${precioFormateado}.`
              );

              return (
                <article
                  key={perfume.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl transition"
                >
                  <Link
                    href={`/perfumes/${perfume.slug}`}
                    className="block"
                  >
                    <div className="h-80 bg-[#e9e1d7] flex items-center justify-center p-6 cursor-pointer">
                      <img
                        src={perfume.image_url}
                        alt={`${perfume.name} de ${perfume.brand}`}
                        className="h-full w-full object-contain group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-6 pb-0 cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-black/40">
                            {perfume.type}
                          </p>

                          <h3
                            translate="no"
                            className="notranslate mt-1 text-xl font-semibold group-hover:underline underline-offset-4"
                          >
                            {perfume.name}
                          </h3>

                          <p
                            translate="no"
                            className="notranslate mt-1 text-sm text-black/50"
                          >
                            {perfume.brand}
                          </p>
                        </div>

                        <p className="font-semibold whitespace-nowrap">
                          {precioFormateado}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-black/60">
                        {perfume.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-sm text-black/50">
                        <span>{perfume.category}</span>

                        {perfume.size_ml && (
                          <span>{perfume.size_ml} ml</span>
                        )}
                      </div>

                      <p className="mt-5 text-sm font-medium">
                        Ver detalles →
                      </p>
                    </div>
                  </Link>

                  <div className="px-6 pb-6">
                    <a
                      href={`https://wa.me/573151878609?text=${mensajeWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-6 rounded-full bg-black px-5 py-3 text-center text-sm text-white hover:bg-black/80 transition"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}