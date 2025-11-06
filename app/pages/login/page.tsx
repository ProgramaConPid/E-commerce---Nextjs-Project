"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/services/userLogged";
import { logginMail } from "@/constant/emails/logginMail";
import Link from "next/link";

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
        router.push("/pages/home");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Encabezado */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Iniciar sesión
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Accede a tu cuenta y disfruta de todo lo que ofrece{" "}
            <span className="text-indigo-400 font-medium">TechNova</span>.
          </p>
        </header>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-200">Email</span>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </label>

          <label className="block relative">
            <span className="text-sm font-medium text-gray-200">
              Contraseña
            </span>
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white transition"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
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

          <button
            onClick={() => signIn("google", { callbackUrl: "/pages/home" })}
            className="w-full flex items-center justify-center gap-3 border p-2 rounded bg-(--white) cursor-pointer"
          >
            <img src="/icons/Logo-google-icon.png" alt="Google" className="w-5 h-5" />
            Ingresar con Google
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-gray-300">
          ¿No tienes cuenta?{" "}
          <Link
            href="/pages/register"
            className="text-indigo-400 hover:underline font-medium"
          >
            Crear cuenta
          </Link>
        </footer>
      </div>
    </div>
  );
}
