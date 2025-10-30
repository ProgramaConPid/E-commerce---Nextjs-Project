"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/services/userLogged";
import { logginMail } from "@/constant/emails/logginMail";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales incorrectas o usuario no encontrado.");
      } else {
        router.push("/");
        sendEmail({
          email: form.email,
          asunto: "Inicio de sesión exitoso",
          mensajeHtml: logginMail,
        });
      }
    } catch (err: unknown) {
      console.error("Error en el inicio de sesión:", err);
      setError("Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mt-1">Accede a tu cuenta</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-sm font-medium text-gray-700 block">
            Email
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-700 block relative">
            Contraseña
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-60 transition"
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
            <span>{loading ? "Entrando..." : "Entrar"}</span>
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Crear cuenta
          </a>
        </footer>
      </div>
    </div>
  );
}
