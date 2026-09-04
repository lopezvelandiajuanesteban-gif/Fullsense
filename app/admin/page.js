"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/admin/login";
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
        <p className="text-black/50">Cargando panel...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/10 bg-white">
        <div className="flex items-center gap-3">
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
              Panel de administración
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-full border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-black/40">
            Administración
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold">
            Bienvenido a Fullsense Admin
          </h1>

          <p className="mt-4 text-black/60">
            Desde aquí podrás administrar productos, imágenes,
            disponibilidad y más.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <a
              href="/admin/products"
              className="block bg-white rounded-3xl border border-black/10 p-6 hover:border-black/30 hover:shadow-sm transition"
            >
              <p className="text-sm text-black/40">
                Productos
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Gestionar catálogo
              </h2>

              <p className="mt-3 text-sm text-black/60">
                Agrega, edita y elimina perfumes.
              </p>
            </a>

            <div className="bg-white rounded-3xl border border-black/10 p-6">
              <p className="text-sm text-black/40">
                Imágenes
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Supabase Storage
              </h2>

              <p className="mt-3 text-sm text-black/60">
                Gestiona las imágenes de los productos.
              </p>

              <p className="mt-4 text-xs text-black/35">
                Próximamente
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-black/10 p-6">
              <p className="text-sm text-black/40">
                Cuenta
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Administrador
              </h2>

              <p className="mt-3 text-sm text-black/60 break-all">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}