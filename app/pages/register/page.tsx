"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data: FormData) => {
    if (!data.name.trim()) return "El nombre es requerido.";
    if (!data.email.trim()) return "El email es requerido.";
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(data.email)) return "Ingresa un email válido.";
    if (data.password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const v = validate(form);
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrarse");
        setLoading(false);
        return;
      }

      setMessage(
        data.msg || "Cuenta creada correctamente. Redirigiendo al login..."
      );
      setTimeout(() => router.push("/pages/login"), 900);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] bg-cover opacity-10"></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-(--white)">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Regístrate para acceder a tu panel y descubrir increíbles ofertas.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="text-sm font-medium text-gray-200 block">
            Nombre
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tu nombre"
              className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-200 block">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="tucorreo@ejemplo.com"
              className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-200 block">
            Contraseña
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-indigo-400 transition"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow-md transition disabled:opacity-60"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : null}
            <span>{loading ? "Creando cuenta..." : "Crear cuenta"}</span>
          </button>
        </form>

        <footer className="mt-8 text-center text-sm text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link href="/pages/login" className="text-indigo-400 hover:underline">
            Inicia sesión
          </Link>
        </footer>
      </div>
    </div>
  );
}
