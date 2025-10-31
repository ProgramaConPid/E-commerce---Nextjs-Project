"use client";

import Link from "next/link";
import { raleway } from "@/app/fonts/mainFonts";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, Heart, ShoppingCart, LogOut, Search, User } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-(--white) shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold text-(--black) tracking-tight hover:opacity-90 transition ${raleway.className}`}
        >
          Pidcommerce
        </Link>

        <div className="container__input--search flex items-center rounded-tl-[.4rem] rounded-bl-[.4rem] rounded-tr-[.4rem] rounded-br-[.4rem] overflow-hidden">
          <div className="container__icon--search p-3 bg-(--grey)">
            <Search className="icon-search text-(--grey-color)" />
          </div>
          <input
            type="text"
            className="input__search bg-(--grey) py-3 focus:outline-0"
            placeholder="Search"
          />
        </div>

        <div className="nav__links flex gap-5 
        items-center">
          <div className="nav__links--text flex gap-7">
            <Link href="/pages/home" className="nav__link--item text-(--grey-color)">
              Home
            </Link>
            <Link href="/pages/about" className="nav__link--item text-(--grey-color)">
              About
            </Link>
            <Link href="/pages/contact" className="nav__link--item text-(--grey-color)">
              Contact Us
            </Link>
            <Link href="/pages/blog" className="nav__link--item text-(--grey-color)">
              Blog
            </Link>
          </div>

          <div className="nav__links--icons flex gap-3">
            <Link href="/pages/favorites" className="nav__link--item text-(--black)">
              <Heart />
            </Link>
            <Link href="/pages/shopping" className="nav__link--item text-(--black)">
              <ShoppingCart />
            </Link>
            <Link href="/pages/user" className="nav__link--item text-(--black)">
              <User />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
