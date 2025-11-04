"use client";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md ring-1 ring-black/5">
          <h1 className="text-2xl font-semibold mb-2">No estás logueado</h1>
          <p className="text-gray-600 mb-4">
            Por favor{" "}
            <a href="pages/login" className="text-indigo-600 hover:underline">
              inicia sesión
            </a>{" "}
            o{" "}
            <a
              href="pages/register"
              className="text-indigo-600 hover:underline"
            >
              crea una cuenta
            </a>
            .
          </p>
        </div>
      </div>
    );
}
