"use client";

import Link from "next/link";
import { raleway } from "@/app/fonts/mainFonts";
import { useSession, signOut } from "next-auth/react";
import {
  Heart,
  ShoppingCart,
  LogOut,
  Search,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="bg-(--white) shadow-md z-50">
      <div className="container__nav py-3 flex items-center justify-between px-4 md:px-0">

        <Link
          href="/"
          className={`text-2xl font-bold text-(--black) tracking-tight hover:opacity-90 transition ${raleway.className}`}
        >
          Pidcommerce
        </Link>

        <button
          className="md:hidden text-(--black)"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex w-[350px] items-center rounded-[0.4rem] overflow-hidden bg-(--grey)">
          <div className="p-3">
            <Search className="icon-search text-(--grey-color)" />
          </div>
          <input
            type="text"
            className="w-full bg-(--grey) py-3 px-2 focus:outline-none"
            placeholder="Buscar productos..."
          />
        </div>

        <div className="hidden md:flex nav__links gap-11 items-center">
          <div className="nav__links--text flex gap-9">
            <Link href="/pages/home" className="nav__link--item hover:text-(--black) text-(--grey-color) duration-300 ease-in">
              Home
            </Link>

            <Link href="/pages/about" className="nav__link--item hover:text-(--black) text-(--grey-color) duration-300 ease-in">
              About
            </Link>

            <Link href="/pages/contact" className="nav__link--item hover:text-(--black) text-(--grey-color) duration-300 ease-in">
              Contact
            </Link>

            <Link href="/pages/blog" className="nav__link--item hover:text-(--black) text-(--grey-color) duration-300 ease-in">
              Blog
            </Link>
          </div>

          <div ref={menuRef} className="nav__links--icons flex gap-5 items-center relative">
            <Link href="/pages/favorites" className="text-(--black)">
              <Heart />
            </Link>

            <Link href="/pages/shopping" className="text-(--black)">
              <ShoppingCart />
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="focus:outline-none rounded-full border border-gray-300 hover:border-indigo-500 transition overflow-hidden w-9 h-9"
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
                  <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-md shadow-xl p-3 flex flex-col z-50">
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
              <Link href="/pages/login" className="text-(--black) hover:text-indigo-500 transition">
                <User />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* MENU MÓVIL */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow-lg animate-fadeIn">
          
          {/* BUSCADOR MÓVIL */}
          <div className="flex w-full mb-4 items-center rounded-lg overflow-hidden bg-(--grey)">
            <div className="p-3">
              <Search className="text-(--grey-color)" />
            </div>
            <input
              type="text"
              className="w-full bg-(--grey) py-3 px-2 focus:outline-none"
              placeholder="Buscar productos..."
            />
          </div>

          <div className="flex flex-col gap-4 text-lg">
            <Link href="/pages/home" className="hover:text-indigo-600">Home</Link>
            <Link href="/pages/about" className="hover:text-indigo-600">About</Link>
            <Link href="/pages/contact" className="hover:text-indigo-600">Contact</Link>
            <Link href="/pages/blog" className="hover:text-indigo-600">Blog</Link>

            <div className="flex gap-4 pt-2">
              <Link href="/pages/favorites"><Heart /></Link>
              <Link href="/pages/shopping"><ShoppingCart /></Link>
              {session?.user ? (
                <button onClick={() => signOut({ callbackUrl: "/" })} className="text-red-500 flex items-center gap-2">
                  <LogOut size={18} /> Cerrar sesión
                </button>
              ) : (
                <Link href="/pages/login"><User /></Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
