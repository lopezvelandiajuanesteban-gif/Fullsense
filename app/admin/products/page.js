"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

          {products.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white border border-black/10 p-10 text-center">
              <p className="text-black/50">
                No hay productos registrados.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-5">
              {products.map((product) => {
                const price = new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                }).format(product.price);

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
                      <p className="text-xs uppercase tracking-wider text-black/40">
                        {product.brand}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold">
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

                    <div className="flex gap-3">
                      <a
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-full border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition"
                      >
                        Editar
                      </a>

                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="rounded-full border border-red-600 px-5 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                      >
                        {deletingId === product.id
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
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