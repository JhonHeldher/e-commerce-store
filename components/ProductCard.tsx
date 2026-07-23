"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
    product: ProductType;
    updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
    return (
        <Link
            href={`/products/${product._id}`}
            className="group w-[250px] flex flex-col gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
            {/* Container da Imagem com efeito de Zoom */}
            <div className="w-full h-[250px] rounded-xl overflow-hidden bg-gray-50 relative">
                <Image
                    src={product.media[0]}
                    alt={product.title}
                    fill // Usar fill ajuda a preencher melhor o container mantendo a proporção
                    sizes="250px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col gap-1 w-full px-1">
                <span className="text-sm text-gray-400 uppercase font-semibold tracking-wider text-xs">
                    {product.category}
                </span>
                <span className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </span>
            </div>

            {/* Preço e Favorito */}
            <div className="flex justify-between items-center w-full px-1 mt-auto pt-2 border-t border-gray-50">
                <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                </span>
                {/* Evento para evitar que o clique no coração abra a página do produto */}
                <div onClick={(e) => e.preventDefault()} className="z-10">
                    <HeartFavorite product={product} updateSignedInUser={updateSignedInUser}/>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;