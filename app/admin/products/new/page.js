"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function NewProductPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Hombre",
    type: "Árabe",
    size_ml: "100",
    image_url: "",
    description: "",
    available: true,
    slug: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/admin/login";
        return;
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("PRODUCTS").insert([
      {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        category: form.category,
        type: form.type,
        size_ml: Number(form.size_ml),
        image_url: form.image_url,
        description: form.description,
        available: form.available,
        slug: form.slug,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("No se pudo guardar el perfume.");
      setSaving(false);
      return;
    }

    setMessage("Perfume agregado correctamente.");

    setTimeout(() => {
      window.location.href = "/admin/products";
    }, 800);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
        <p className="text-black/50">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
      <header className="px-6 py-5 md:px-12 border-b border-black/10 bg-white">
        <a href="/admin/products" className="flex items-center gap-3">
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
              Agregar perfume
            </p>
          </div>
        </a>
      </header>

      <section className="px-6 md:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">
              Catálogo
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Nuevo perfume
            </h1>

            <p className="mt-3 text-black/60">
              Completa la información del producto.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-black/10 p-6 md:p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Nombre
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Marca
                </label>

                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Precio
                </label>

                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="250000"
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Tamaño (ml)
                </label>

                <input
                  name="size_ml"
                  type="number"
                  value={form.size_ml}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Categoría
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                >
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Tipo
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
                >
                  <option value="Árabe">Árabe</option>
                  <option value="Diseñador">Diseñador</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                URL de la imagen
              </label>

              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                required
                placeholder="https://..."
                className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Descripción
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black resize-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Slug
              </label>

              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                placeholder="nitro-red"
                className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                name="available"
                type="checkbox"
                checked={form.available}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm">
                Producto disponible
              </span>
            </label>

            {message && (
              <p className="text-sm">
                {message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white hover:bg-black/80 transition disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar perfume"}
              </button>

              <a
                href="/admin/products"
                className="rounded-full border border-black px-7 py-3 text-center text-sm hover:bg-black hover:text-white transition"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}