"use client"

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const HeartFavorite = ({ product }: { product: ProductType }) => {
    const router = useRouter();
    const { user } = useUser();

    const [loading, setLoading] = useState(false);
    const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users");

            if (!res.ok) {
                throw new Error(`Erro ao buscar usuário: ${res.status}`);
            }

            const data = await res.json();
            setSignedInUser(data);
            setIsLiked(data.wishlist?.includes(product._id) || false);
        } catch (err) {
            console.error("[users_GET]", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) getUser();
    }, [user]);

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!user) {
            router.push("/sign-in");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/users/wishlist", {
                method: "POST",
                body: JSON.stringify({
                    productId: product._id,
                }),
            });

            if (!res.ok) {
                throw new Error(`Erro ao curtir produto: ${res.status}`);
            }

            const updatedUser = await res.json();
            setSignedInUser(updatedUser);
            setIsLiked(updatedUser.wishlist?.includes(product._id) || false);
        } catch (err) {
            console.error("[wishlist_POST]", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleLike} className='cursor-pointer'>
            <Heart fill={`${isLiked ? "red" : "none"}`} />
        </button>
    )
}

export default HeartFavorite