"use client";
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md ring-1 ring-black/5">
          <h1 className="text-2xl font-semibold mb-2">No estás logueado</h1>
          <p className="text-gray-600 mb-4">
            Por favor{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              inicia sesión
            </a>{" "}
            o{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              crea una cuenta
            </a>
            .
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg ring-1 ring-black/5 text-center max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-3 text-gray-800">
          ¡Bienvenido, {session.user?.name}!
        </h1>
        <p className="text-gray-600 mb-6">{session.user?.email}</p>

        <button
          onClick={() => signOut()}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg shadow transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
