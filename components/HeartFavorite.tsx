"use client"

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'


interface HeartFavoriteProps {
    product: ProductType;
    updateSignedInUser?: (updateUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
    const router = useRouter();
    const { user } = useUser();

    const [loading, setLoading] = useState(false);
    // const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users");

            if (!res.ok) {
                throw new Error(`Erro ao buscar usuário: ${res.status}`);
            }

            const data = await res.json();
            // setSignedInUser(data);
            setIsLiked(data.wishlist?.includes(product._id) || false);
        } catch (err) {
            console.error("[users_GET]", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && !loading) {
            getUser();
        }
    }, [user?.id]);

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!user) {
            router.push("/sign-in");
            return;
        }

        // 🔥 ATUALIZAÇÃO OTIMISTA: Muda o estado na tela IMEDIATAMENTE antes do fetch
        const previousIsLiked = isLiked;
        setIsLiked(!previousIsLiked);

        try {
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
            // setSignedInUser(updatedUser);
            // Sincroniza com o valor real vindo do back-end
            setIsLiked(updatedUser.wishlist?.includes(product._id) || false);
            updateSignedInUser && updateSignedInUser(updatedUser);

        } catch (err) {
            console.error("[wishlist_POST]", err);
            // 🔄 REVERSÃO: Se der erro no servidor, o coração volta ao estado anterior
            setIsLiked(previousIsLiked);
        }
    };

    return (
        // Removido o disabled={loading} para o botão responder na hora e adicionado efeito de escala ao clicar
        <button 
            onClick={handleLike} 
            className='cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-150'
        >
            <Heart 
                className="transition-colors duration-200"
                fill={isLiked ? "red" : "none"} 
                color={isLiked ? "red" : "currentColor"} 
            />
        </button>
    )
}

export default HeartFavorite;