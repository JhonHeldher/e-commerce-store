"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Menu,
  X,
  ShoppingCart,
  CircleUserRound,
  SearchIcon,
} from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { user, isLoaded } = useUser();
  const cart = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  if (!isLoaded) return null;

  return (
    <nav className="sticky top-0 z-10 py-2 px-10 bg-white shadow-xl flex flex-row justify-between items-center gap-3 max-sm:px-2">
      <div>
        <Link href="/">
          <Image src="/log.svg" alt="logo" width={130} height={100} />
        </Link>
      </div>

      <ul className="flex gap-6 font-semibold max-lg:hidden items-center">
        <li>
          <Link
            href="/"
            className={`border-b-2 pb-1 transition-colors ${
              currentPath === "/"
                ? "text-blue-500 border-blue-500 font-bold"
                : "text-gray-500 hover:text-black border-transparent hover:border-black"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/wishlist"
            className={`border-b-2 pb-1 transition-colors ${
              currentPath.startsWith("/wishlist")
                ? "text-blue-500 border-blue-500 font-bold"
                : "text-gray-500 hover:text-black border-transparent hover:border-black"
            }`}
          >
            Wishlist
          </Link>
        </li>
        <li>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className={`border-b-2 pb-1 transition-colors ${
              currentPath.startsWith("/orders")
                ? "text-blue-500 border-blue-500 font-bold"
                : "text-gray-500 hover:text-black border-transparent hover:border-black"
            }`}
          >
            Ordens
          </Link>
        </li>
      </ul>

      {/* Formulário de Busca */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query !== "") {
            router.push(`/search/${query}`);
          }
        }}
        className="flex gap-3 border border-gray-500 px-3 py-1 items-center rounded-lg"
      >
        <input
          type="text"
          className="max-sm:max-w-[120px] outline-none text-sm"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={query === ""}>
          <SearchIcon className="cursor-pointer h-4 w-4 hover:text-blue-500" />
        </button>
      </form>

      <div className="flex items-center gap-3">
        {/* Carrinho Desktop */}
        <Link
          href="/cart"
          className={`flex items-center gap-1 rounded-lg px-2 py-1 transition-colors shadow-sm max-md:hidden border ${
            currentPath.startsWith("/cart")
              ? "bg-black text-white border-black"
              : "hover:bg-black hover:text-white border-transparent hover:border-black"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <sup className="text-xs font-bold vertical-super">
            {cart.cartItems.length}
          </sup>
        </Link>

        {/* Menu Mobile */}
        <div className="relative lg:hidden">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`cursor-pointer transition-transform duration-300 ease-in-out transform ${
              isMenuOpen ? "rotate-90" : "-rotate-0"
            }`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </div>

          {isMenuOpen && (
            <ul className="absolute flex flex-col w-40 items-center gap-4 p-4 top-10 right-0 bg-white shadow-lg rounded-lg lg:hidden z-20">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b-2 pb-1 ${
                    currentPath === "/"
                      ? "text-blue-500 border-blue-500 font-bold"
                      : "text-gray-500 hover:text-black border-transparent hover:border-black"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b-2 pb-1 ${
                    currentPath.startsWith("/wishlist")
                      ? "text-blue-500 border-blue-500 font-bold"
                      : "text-gray-500 hover:text-black border-transparent hover:border-black"
                  }`}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href={user ? "/orders" : "/sign-in"}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b-2 pb-1 ${
                    currentPath.startsWith("/orders")
                      ? "text-blue-500 border-blue-500 font-bold"
                      : "text-gray-500 hover:text-black border-transparent hover:border-black"
                  }`}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 bg-black text-white shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cart.cartItems.length})</span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Botão de Usuário / Login */}
        {user ? (
          <UserButton />
        ) : (
          <Link
            href="/sign-in"
            className="border border-blue-500 rounded-lg px-3 py-1 flex items-center gap-2 text-blue-500 animate-pulse [animation-duration:4s] transition-all duration-1200 hover:animate-none hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="font-bold text-sm hidden md:inline">Sign-in</span>
            <CircleUserRound className="h-5 w-5" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
