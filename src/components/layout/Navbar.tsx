"use client";

import Link from "next/link";
import { raleway } from "@/app/fonts/mainFonts";
import { useSession, signOut } from "next-auth/react";
import { Heart, ShoppingCart, LogOut, Search, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-(--white) shadow-md z-9999">
      <div className="container__nav py-3 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold text-(--black) tracking-tight hover:opacity-90 transition ${raleway.className}`}
        >
          Pidcommerce
        </Link>

        {/* BUSCADOR */}
        <div className="container__input--search w-[350px] flex items-center rounded-[0.4rem] overflow-hidden">
          <div className="container__icon--search p-3 bg-(--grey)">
            <Search className="icon-search text-(--grey-color)" />
          </div>
          <input
            type="text"
            className="input__search w-full bg-(--grey) py-3 px-2 focus:outline-0"
            placeholder="Buscar productos..."
          />
        </div>

        {/* LINKS */}
        <div className="nav__links flex gap-11 items-center">
          <div className="nav__links--text flex gap-9">
            <Link
              href="/pages/home"
              className={`nav__link--item text-(--grey-color) hover:text-(--black) duration-300 ease-in ${raleway.className}`}
            >
              Home
            </Link>
            <Link
              href="/pages/about"
              className={`nav__link--item text-(--grey-color) hover:text-(--black) duration-300 ease-in ${raleway.className}`}
            >
              About
            </Link>
            <Link
              href="/pages/contact"
              className={`nav__link--item text-(--grey-color) hover:text-(--black) duration-300 ease-in ${raleway.className}`}
            >
              Contact Us
            </Link>
            <Link
              href="/pages/blog"
              className={`nav__link--item text-(--grey-color) hover:text-(--black) duration-300 ease-in ${raleway.className}`}
            >
              Blog
            </Link>
          </div>

          {/* ICONOS DERECHA */}
          <div
            ref={menuRef}
            className="nav__links--icons flex gap-5 items-center relative"
          >
            <Link href="/pages/favorites" className="text-(--black)">
              <Heart />
            </Link>

            <Link href="/pages/shopping" className="text-(--black)">
              <ShoppingCart />
            </Link>

            {/* --- Avatar + Menú en flujo flex --- */}
            {session?.user ? (
              <div className="flex items-center gap-3">
                {/* Botón del avatar */}
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="focus:outline-none rounded-full border border-gray-300 hover:border-indigo-500 transition"
                  style={{
                    width: "36px",
                    height: "36px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="Perfil"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>

                {menuOpen && (
                  <div className="flex flex-col bg-white border border-gray-200 rounded-md shadow-xl p-3 absolute top-12 right-0 w-56 z-9999">
                    <div className="flex flex-col items-start gap-1 mb-3 border-b pb-2">
                      <span className="font-semibold text-gray-900">
                        {session.user.name}
                      </span>
                      <span className="text-sm text-gray-600 truncate">
                        {session.user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                    >
                      <LogOut size={18} />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/pages/login"
                className="nav__link--item text-(--black) hover:text-indigo-500 transition"
                title="Iniciar sesión"
              >
                <User />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
