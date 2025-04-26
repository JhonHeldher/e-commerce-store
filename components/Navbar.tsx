"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, ShoppingCart, CircleUserRound } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const Navbar = () => {
    const { user, isLoaded } = useUser();
    const cart = useCart();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Aguarde o carregamento do usuário para exibir o menu de forma confiável:
    if (!isLoaded) return null;

    return (
        <nav className="sticky top-0 z-10 py-2 px-10 bg-white shadow-xl">
            <ul className="flex flex-row justify-between items-center">
                <li>
                    <Link href="/">
                        <Image src="/log.svg" alt="logo" width={130} height={100} />
                    </Link>
                </li>

                <li>
                    <Link href="/">Home</Link>
                </li>

                <li className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-black hover:text-white transition-colors shadow-sm"
                    >
                        <ShoppingCart />
                        <span className="font-bold">Cart ({cart.cartItems.length})</span>
                    </Link>

                    <div className="relative">
                        <div
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`cursor-pointer transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "rotate-90" : "-rotate-0"
                                }`}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </div>

                        {isMenuOpen && (
                            <ul className="absolute flex flex-col w-25 items-center gap-2 p-3 top-10 right-0 bg-white font-bold shadow-lg rounded-lg">
                                <li>
                                    <Link
                                        href={user ? "/wishlist" : "/sign-in"}
                                        className="hover:text-blue-500"
                                    >
                                        Wishlist
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={user ? "/orders" : "/sign-in"}
                                        className="hover:text-blue-500"
                                    >
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {user ? (<UserButton />) : (
                        <Link
                            href="/sign-in"
                            className="border-blue-500 border rounded-lg px-2 py-1"
                        >
                            <CircleUserRound />
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
