"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [updatingToggle, setUpdatingToggle] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/admin/login";
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("PRODUCTS")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `¿Seguro que quieres eliminar "${product.name}"? Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) {
      return;
    }

    setDeletingId(product.id);

    const { error } = await supabase
      .from("PRODUCTS")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("Error eliminando producto:", error);
      alert("No se pudo eliminar el perfume.");
      setDeletingId(null);
      return;
    }

    setProducts((prev) =>
      prev.filter((item) => item.id !== product.id)
    );

    setDeletingId(null);
  };

  const handleToggle = async (product, field) => {
    const toggleKey = `${product.id}-${field}`;
    const nuevoValor = !Boolean(product[field]);

    setUpdatingToggle(toggleKey);

    const { error } = await supabase
      .from("PRODUCTS")
      .update({
        [field]: nuevoValor,
      })
      .eq("id", product.id);

    if (error) {
      console.error(`Error actualizando ${field}:`, error);
      alert("No se pudo actualizar el perfume.");
      setUpdatingToggle(null);
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              [field]: nuevoValor,
            }
          : item
      )
    );

    setUpdatingToggle(null);
  };

  const textoBusqueda = busqueda.toLowerCase().trim();

  const productsFiltrados = products.filter((product) => {
    if (textoBusqueda === "") {
      return true;
    }

    const nombre = product.name?.toLowerCase() ?? "";
    const marca = product.brand?.toLowerCase() ?? "";

    return (
      nombre.includes(textoBusqueda) ||
      marca.includes(textoBusqueda)
    );
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
        <p className="text-black/50">Cargando productos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/10 bg-white">
        <a href="/admin" className="flex items-center gap-3">
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
              Gestión de productos
            </p>
          </div>
        </a>

        <button
          onClick={handleLogout}
          className="rounded-full border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-black/40">
                Catálogo
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-semibold">
                Productos
              </h1>

              <p className="mt-3 text-black/60">
                Administra los perfumes disponibles en Fullsense.
              </p>
            </div>

            <a
              href="/admin/products/new"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 transition"
            >
              + Agregar perfume
            </a>
          </div>

          {/* BUSCADOR */}
          {products.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="relative w-full md:max-w-md">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o marca..."
                    className="w-full rounded-full border border-black/15 bg-white px-5 py-3 pr-12 text-sm outline-none transition focus:border-black"
                  />

                  {busqueda ? (
                    <button
                      type="button"
                      onClick={() => setBusqueda("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-black/40 hover:text-black transition"
                      aria-label="Limpiar búsqueda"
                    >
                      ×
                    </button>
                  ) : (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                      <svg
                        width="19"
                        height="19"
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
                    </span>
                  )}
                </div>

                <p className="text-sm text-black/45">
                  {productsFiltrados.length === 1
                    ? "1 perfume"
                    : `${productsFiltrados.length} perfumes`}
                </p>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white border border-black/10 p-10 text-center">
              <p className="text-black/50">
                No hay productos registrados.
              </p>
            </div>
          ) : productsFiltrados.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-white border border-black/10 p-10 text-center">
              <p className="text-lg font-medium">
                No encontramos ese perfume.
              </p>

              <p className="mt-2 text-sm text-black/50">
                Prueba buscando por otro nombre o marca.
              </p>

              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="mt-5 text-sm underline underline-offset-4 text-black/60 hover:text-black"
              >
                Ver todos los perfumes
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-5">
              {productsFiltrados.map((product) => {
                const price = new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                }).format(product.price);

                const nuevoActivo = Boolean(product.is_new);
                const destacadoActivo = Boolean(product.featured);

                const actualizandoNuevo =
                  updatingToggle === `${product.id}-is_new`;

                const actualizandoDestacado =
                  updatingToggle === `${product.id}-featured`;

                return (
                  <div
                    key={product.id}
                    className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-5"
                  >
                    <div className="w-24 h-24 rounded-xl bg-[#e9e1d7] flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <p
                        translate="no"
                        className="notranslate text-xs uppercase tracking-wider text-black/40"
                      >
                        {product.brand}
                      </p>

                      <h2
                        translate="no"
                        className="notranslate mt-1 text-xl font-semibold"
                      >
                        {product.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-black/50">
                        <span>{product.type}</span>

                        <span>{product.category}</span>

                        <span>{product.size_ml} ml</span>

                        <span>{price}</span>
                      </div>

                      <p className="mt-2 text-sm">
                        {product.available ? (
                          <span className="text-green-700">
                            Disponible
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Agotado
                          </span>
                        )}
                      </p>
                    </div>

                    {/* ACCIONES */}
                    <div className="w-full md:w-auto md:min-w-[230px]">

                      {/* CONTROLES RÁPIDOS */}
                      <div className="mb-4 rounded-2xl border border-black/10 bg-[#faf8f5] px-4 py-3">

                        {/* NUEVO */}
                        <div className="flex items-center justify-between gap-6">
                          <div>
                            <p className="text-sm font-medium">
                              Nuevo
                            </p>

                            <p
                              className={`text-xs ${
                                nuevoActivo
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                            >
                              {nuevoActivo ? "Sí" : "No"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(product, "is_new")
                            }
                            disabled={actualizandoNuevo}
                            aria-pressed={nuevoActivo}
                            aria-label={`Marcar ${product.name} como nuevo`}
                            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
                              nuevoActivo
                                ? "bg-green-600"
                                : "bg-red-500"
                            } ${
                              actualizandoNuevo
                                ? "cursor-wait opacity-50"
                                : "cursor-pointer"
                            }`}
                          >
                            <span
                              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                                nuevoActivo
                                  ? "left-6"
                                  : "left-1"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="my-3 border-t border-black/10" />

                        {/* DESTACADO */}
                        <div className="flex items-center justify-between gap-6">
                          <div>
                            <p className="text-sm font-medium">
                              Destacado
                            </p>

                            <p
                              className={`text-xs ${
                                destacadoActivo
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                            >
                              {destacadoActivo ? "Sí" : "No"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(product, "featured")
                            }
                            disabled={actualizandoDestacado}
                            aria-pressed={destacadoActivo}
                            aria-label={`Destacar ${product.name}`}
                            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
                              destacadoActivo
                                ? "bg-green-600"
                                : "bg-red-500"
                            } ${
                              actualizandoDestacado
                                ? "cursor-wait opacity-50"
                                : "cursor-pointer"
                            }`}
                          >
                            <span
                              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                                destacadoActivo
                                  ? "left-6"
                                  : "left-1"
                              }`}
                            />
                          </button>
                        </div>

                      </div>

                      {/* EDITAR / ELIMINAR */}
                      <div className="flex gap-3">
                        <a
                          href={`/admin/products/${product.id}/edit`}
                          className="flex-1 rounded-full border border-black px-5 py-2 text-center text-sm hover:bg-black hover:text-white transition"
                        >
                          Editar
                        </a>

                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                          className="flex-1 rounded-full border border-red-600 px-5 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                        >
                          {deletingId === product.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}