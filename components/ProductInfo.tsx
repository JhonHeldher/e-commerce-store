"use client"

import { useState } from 'react';
import HeartFavorite from './HeartFavorite';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import useCart from '@/lib/hooks/useCart';


const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(productInfo.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(productInfo.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart()


  const router = useRouter();
  const { user } = useUser();

  return (
    <div className='max-w-[400px] flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='font-bold'>{productInfo.title}</span>

        <HeartFavorite
          product={productInfo}
        />
      </div>

      <div className='flex gap-2'>
        <span className='font-bold text-gray-500'>Category:</span>
        <span className='text-gray-500'>{productInfo.category}</span>
      </div>

      <span className='font-bold'>${productInfo.price}</span>

      <div className='flex flex-col gap-2'>
        <span className='font-bold text-gray-500'>Descripton:</span>
        <span className='text-gray-500'>{productInfo.description}</span>
      </div>

      {productInfo.colors.length > 0 && (
        <div className='flex flex-col gap-2'>
          <span className='font-bold text-gray-500'>Colors:</span>
          <div className='flex gap-2'>
            {productInfo.colors.map((color, index) => (
              <span
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`
                  cursor-pointer border border-black px-2 py-1 rounded-lg text-gray-500 
                  ${selectedColor === color && "bg-black text-white"}
                `}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className='flex flex-col gap-2'>
          <span className='font-bold text-gray-500'>Sizes:</span>
          <div className='flex gap-2'>
            {productInfo.sizes.map((size, index) => (
              <span
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`
                  cursor-pointer border border-black px-2 py-1 rounded-lg text-gray-500
                  ${selectedSize === size && "bg-black text-white"}
                  `}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <span className='font-bold text-gray-500'>Quantity:</span>
        <div className='flex gap-2 4 items-center'>
          <MinusCircle
            className='cursor-pointer hover:text-blue-500'
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <span className='text-gray-500'>{quantity}</span>
          <PlusCircle
            className='cursor-pointer hover:text-blue-500'
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        onClick={() => {
          if (!user) {
            router.push("/sign-in");
            return;
          }
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize
          });
        }}
        className='border-3 border-black hover:bg-black hover:text-white py-2 px-4 rounded-lg'
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductInfo