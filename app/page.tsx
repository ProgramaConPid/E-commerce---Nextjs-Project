"use client";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-indigo-950 via-slate-900 to-black px-4">
  <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 max-w-lg">
    <h1 className="text-4xl font-bold text-white mb-4">
      ¡Bienvenido a{" "}
      <span className="text-indigo-400 drop-shadow-sm">Pidcommerce</span>!
    </h1>

    <p className="text-gray-200 mb-6 leading-relaxed text-lg">
      Regístrate o inicia sesión para acceder a{" "}
      <span className="font-semibold text-indigo-300">
        increíbles descuentos, productos exclusivos
      </span>{" "}
      y mucho más.
    </p>

    <div className="flex justify-center gap-4 mt-6">
      <a
        href="pages/login"
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg"
      >
        Iniciar sesión
      </a>
      <a
        href="pages/register"
        className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/20 transition-all"
      >
        Registrarse
      </a>
    </div>
  </div>
</div>
    );
}
