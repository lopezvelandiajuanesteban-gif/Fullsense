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

  const perfumesFiltrados = perfumes.filter((perfume) => {
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
  });

  const limpiarFiltros = () => {
    setFiltro("Todos");
    setBusqueda("");
    setBuscadorAbierto(false);
  };

  const cerrarBuscadorSiEstaVacio = () => {
    if (busqueda.trim() === "") {
      setBuscadorAbierto(false);
    }
  };

  return (
    <>
      <section className="px-6 md:px-12 py-10 border-y border-black/10">
        <div className="max-w-5xl mx-auto">
          <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-black/40">
            Explora por categoría
          </p>

          <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible justify-start md:justify-center gap-3 pb-2 md:pb-0">
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
          </div>
        </div>
      </section>

      <section id="catalogo" className="px-6 md:px-12 py-20 md:py-24">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                {filtro === "Todos" ? "Selección" : filtro}
              </p>

              <h2 className="mt-3 text-4xl md:text-5xl font-semibold">
                Nuestros perfumes
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {buscadorAbierto ? (
                <div className="relative w-full md:w-[360px]">
                  <input
                    autoFocus
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onBlur={cerrarBuscadorSiEstaVacio}
                    placeholder="Buscar por nombre o marca..."
                    className="w-full rounded-full border border-black/20 bg-white px-5 py-3 pr-12 outline-none transition focus:border-black"
                  />

                  {busqueda ? (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setBusqueda("");
                        setBuscadorAbierto(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-black/40 hover:text-black transition"
                      aria-label="Limpiar búsqueda"
                    >
                      ×
                    </button>
                  ) : (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                      ⌕
                    </span>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setBuscadorAbierto(true)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition"
                  aria-label="Buscar perfume"
                  title="Buscar perfume"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
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
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="max-w-md text-black/60">
              Una selección de fragancias para diferentes estilos,
              personalidades y ocasiones.
            </p>

            <p className="text-sm text-black/45">
              {perfumesFiltrados.length === 1
                ? "1 perfume"
                : `${perfumesFiltrados.length} perfumes`}
            </p>
          </div>
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
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={`/perfumes/${perfume.slug}`}
                    className="flex flex-1 flex-col"
                  >
                    <div className="relative h-80 bg-[#e9e1d7] flex items-center justify-center p-6 cursor-pointer">
                      <img
                        src={perfume.image_url}
                        alt={`${perfume.name} de ${perfume.brand}`}
                        className="h-full w-full object-contain group-hover:scale-105 transition duration-500"
                      />

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
                    </div>

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

                        <p className="font-semibold whitespace-nowrap">
                          {precioFormateado}
                        </p>
                      </div>

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
                          <span>{perfume.category}</span>

                          {perfume.size_ml && (
                            <span>{perfume.size_ml} ml</span>
                          )}
                        </div>

                        <p className="mt-5 text-sm font-medium">
                          Ver detalles →
                        </p>
                      </div>
                    </div>
                  </Link>

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