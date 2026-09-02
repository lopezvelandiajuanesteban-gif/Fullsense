"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-black/10 p-8 md:p-10 shadow-sm">
        <div className="text-center">
          <img
            src="/logo-fullsense.png"
            alt="Fullsense"
            className="h-20 w-auto mx-auto object-contain"
          />

          <h1 className="mt-5 text-3xl font-semibold">
            Fullsense Admin
          </h1>

          <p className="mt-2 text-sm text-black/50">
            Ingresa para administrar la tienda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 transition disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <a
          href="/"
          className="block mt-6 text-center text-sm text-black/50 hover:text-black"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}