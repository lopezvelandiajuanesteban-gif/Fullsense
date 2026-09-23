"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductCatalog({ perfumes }) {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);

  const categorias = [
    "Todos",
    "Diseñador",
    "Árabes",
    "Hombre",
    "Mujer",
    "Unisex",
  ];

  const perfumesFiltrados = perfumes
    .filter((perfume) => {
      const coincideCategoria = (() => {
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

        if (filtro === "Unisex") {
          return perfume.category?.toLowerCase() === "unisex";
        }

        return true;
      })();

      const textoBusqueda = busqueda.toLowerCase().trim();

      const coincideBusqueda =
        textoBusqueda === "" ||
        perfume.name?.toLowerCase().includes(textoBusqueda) ||
        perfume.brand?.toLowerCase().includes(textoBusqueda);

      return coincideCategoria && coincideBusqueda;
    })
    .sort((a, b) => {
      const prioridad = (perfume) => {
        if (perfume.is_new && perfume.featured) {
          return 3;
        }

        if (perfume.is_new) {
          return 2;
        }

        if (perfume.featured) {
          return 1;
        }

        return 0;
      };

      const diferencia = prioridad(b) - prioridad(a);

      if (diferencia !== 0) {
        return diferencia;
      }

      return Number(b.id) - Number(a.id);
    });

  const limpiarFiltros = () => {
    setFiltro("Todos");
    setBusqueda("");
    setBuscadorAbierto(false);
  };

  const abrirCerrarBuscador = () => {
    if (buscadorAbierto) {
      setBusqueda("");
      setBuscadorAbierto(false);
    } else {
      setBuscadorAbierto(true);
    }
  };

  return (
    <>
      {/* CATEGORÍAS */}
      <section className="px-6 md:px-12 py-10 border-y border-black/10">
        <div className="max-w-6xl mx-auto">

          <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-black/40">
            Explora por categoría
          </p>

          {/* FILTROS + LUPA */}
          <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-2 md:pb-0">

            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setFiltro(categoria)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm transition ${
                  filtro === categoria
                    ? "bg-black text-white"
                    : "border border-black/15 bg-transparent text-black hover:border-black"
                }`}
              >
                {categoria}
              </button>
            ))}

            {/* LUPA / CERRAR */}
            <button
              type="button"
              onClick={abrirCerrarBuscador}
              className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 ${
                buscadorAbierto
                  ? "border-black bg-black text-white"
                  : "border-black/20 bg-white text-black hover:bg-black hover:text-white"
              }`}
              aria-label={
                buscadorAbierto
                  ? "Cerrar buscador"
                  : "Buscar perfume"
              }
              title={
                buscadorAbierto
                  ? "Cerrar buscador"
                  : "Buscar perfume"
              }
            >
              {buscadorAbierto ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

          </div>

          {/* BUSCADOR DESPLEGABLE */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              buscadorAbierto
                ? "max-h-24 opacity-100 mt-5"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <input
                  autoFocus={buscadorAbierto}
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre o marca..."
                  className="w-full rounded-full border border-black/15 bg-white px-6 py-3.5 pr-12 text-sm outline-none shadow-sm transition focus:border-black focus:shadow-md"
                />

                {busqueda ? (
                  <button
                    type="button"
                    onClick={() => setBusqueda("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-lg text-black/40 hover:bg-black/[0.05] hover:text-black transition"
                    aria-label="Limpiar búsqueda"
                  >
                    ×
                  </button>
                ) : (
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black/35">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M16.5 16.5L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATÁLOGO */}
      <section
        id="catalogo"
        className="px-6 md:px-12 py-10 md:py-12"
      >

        {/* CONTADOR */}
        <div className="mb-6 flex justify-end">
          <p className="text-sm text-black/40">
            {perfumesFiltrados.length === 1
              ? "1 perfume"
              : `${perfumesFiltrados.length} perfumes`}
          </p>
        </div>

        {perfumesFiltrados.length === 0 ? (
          <div className="py-16 text-center">

            <p className="text-lg font-medium">
              No encontramos perfumes con esos criterios.
            </p>

            <p className="mt-2 text-sm text-black/50">
              Prueba con otro nombre, marca o categoría.
            </p>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-5 text-sm underline underline-offset-4 text-black/60 hover:text-black"
            >
              Ver todos los perfumes
            </button>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {perfumesFiltrados.map((perfume) => {
              const tienePrecio =
                Number(perfume.price) > 0;

              const precioFormateado = tienePrecio
                ? new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(perfume.price)
                : null;

              const mensajeWhatsApp =
                encodeURIComponent(
                  tienePrecio
                    ? `Hola, estoy interesado en ${perfume.name} de ${perfume.brand}, ${perfume.size_ml} ml, precio ${precioFormateado}.`
                    : `Hola, estoy interesado en ${perfume.name} de ${perfume.brand}, ${perfume.size_ml} ml. ¿Me confirmas el precio y disponibilidad?`
                );

              return (
                <article
                  key={perfume.id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <Link
                    href={`/perfumes/${perfume.slug}`}
                    className="flex flex-1 flex-col"
                  >

                    {/* IMAGEN */}
                    <div className="relative h-80 bg-[#e9e1d7] flex items-center justify-center p-6 cursor-pointer">

                      <img
                        src={perfume.image_url}
                        alt={`${perfume.name} de ${perfume.brand}`}
                        className="h-full w-full object-contain group-hover:scale-105 transition duration-500"
                      />

                      {/* DISPONIBILIDAD */}
                      <div className="absolute top-4 left-4">

                        {perfume.available ? (
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-700/10">
                            Disponible
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-600/10">
                            Agotado
                          </span>
                        )}

                      </div>

                      {/* NUEVO */}
                      {perfume.is_new && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md ring-1 ring-green-700/20">

                            <span className="h-2 w-2 rounded-full bg-white"></span>

                            Nuevo

                          </span>
                        </div>
                      )}

                    </div>

                    {/* INFORMACIÓN */}
                    <div className="flex flex-1 flex-col p-6 pb-0 cursor-pointer">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

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

                        {/* PRECIO */}
                        {tienePrecio && (
                          <p className="font-semibold whitespace-nowrap">
                            {precioFormateado}
                          </p>
                        )}

                      </div>

                      {/* DESCRIPCIÓN */}
                      <p
                        className="mt-4 text-sm leading-6 text-black/60 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {perfume.description}
                      </p>

                      <div className="mt-auto pt-5">

                        <div className="flex items-center justify-between text-sm text-black/50">

                          <span>
                            {perfume.category}
                          </span>

                          {perfume.size_ml && (
                            <span>
                              {perfume.size_ml} ml
                            </span>
                          )}

                        </div>

                        <p className="mt-5 text-sm font-medium">
                          Ver detalles →
                        </p>

                      </div>

                    </div>

                  </Link>

                  {/* WHATSAPP */}
                  <div className="px-6 pb-6">

                    {perfume.available ? (
                      <a
                        href={`https://wa.me/573151878609?text=${mensajeWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-6 rounded-full bg-black px-5 py-3 text-center text-sm text-white hover:bg-black/80 transition"
                      >
                        Consultar por WhatsApp
                      </a>
                    ) : (
                      <div className="block mt-6 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-center text-sm text-black/40">
                        Producto agotado
                      </div>
                    )}

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