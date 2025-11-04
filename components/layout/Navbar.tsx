"use client";

import Link from "next/link";
import { raleway } from "@/app/fonts/mainFonts";
import { useSession, signOut } from "next-auth/react";
import { Heart, ShoppingCart, LogOut, Search, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-(--white) shadow-md">
      <div className="container py-3 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold text-(--black) tracking-tight hover:opacity-90 transition ${raleway.className}`}
        >
          Pidcommerce
        </Link>

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

          <div className="nav__links--icons flex gap-5 items-center">
            <Link
              href="/pages/favorites"
              className="nav__link--item text-(--black)"
            >
              <Heart />
            </Link>
            <Link
              href="/pages/shopping"
              className="nav__link--item text-(--black)"
            >
              <ShoppingCart />
            </Link>

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-(--black) hover:text-red-500 transition"
                title="Cerrar sesión"
              >
                <LogOut />
              </button>
            ) : (
              <Link
                href="/login"
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
