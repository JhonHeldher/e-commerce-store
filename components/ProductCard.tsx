import Image from "next/image";
import Link from "next/link";

import HeartFavorite from "./HeartFavorite";

const ProductCard = ({ product }: { product: ProductType }) => {

    return (
        <Link
            href={`/products/${product._id}`}
            className="w-[250px] flex flex-col items-center gap-2"
        >
            <Image
                src={product.media[0]}
                alt={product.title}
                width={250}
                height={300}
                className="h-[250px] rounded-lg object-cover"
            />

            <div className="flex flex-col w-full">
                <span className="text-base font-bold">{product.title}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            <div className="flex justify-between w-full">
                <span className="text-base font-bold">${product.price}</span>
                <HeartFavorite
                    product={product}
                />
            </div>
        </Link>
    );
};

export default ProductCard;
