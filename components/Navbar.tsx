"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // iconos modernos

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-fuchsia-600 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition"
        >
          Pidcommerce
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          {status === "loading" ? (
            <span className="text-gray-100/80">Cargando...</span>
          ) : session ? (
            <>
              <span className="text-white/90 font-medium">
                👋 Hola, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg font-medium transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-1.5 rounded-lg font-medium transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden flex flex-col items-center bg-linear-to-b from-purple-600 to-fuchsia-600 py-4 gap-3">
          {status === "loading" ? (
            <span className="text-gray-100/80">Cargando...</span>
          ) : session ? (
            <>
              <span className="text-white font-medium">
                👋 Hola, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg font-medium transition"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-1.5 rounded-lg font-medium transition"
                onClick={() => setOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
