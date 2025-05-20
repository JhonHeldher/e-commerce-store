"use client"

import useCart from '@/lib/hooks/useCart'
import { useUser } from '@clerk/nextjs'
import { MinusCircle, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart()

  const total = cart.cartItems.reduce((acc, cartItem) =>
    acc + cartItem.item.price * cartItem.quantity
    , 0);
  const totalRounded = parseFloat(total.toFixed(2));

  console.log("user info feedback", user)

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName
  }

  const handleCheckout = async () => {
    try {
      if (!user) {
        return router.push("/sign-in");
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'POST',
        body: JSON.stringify({
          cartItems: cart.cartItems, customer
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
      console.log(data)

    } catch (error) {
      console.log("[checkout_POST]", error)
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-sm:gap-10 max-sm:px-5 max-lg:flex-col">
      <div className='w-2/3 max-lg:w-full'>
        <span className='text-2xl max-sm:ml-6 font-bold'>Shopping Cart</span>
        <hr className='my-6' />

        {cart.cartItems.length === 0 ? (
          <span className='text-2xl font-bold text-gray-500'>No items in cart</span>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className='w-full relative flex max-sm:flex-col max-sm:gap-3 justify-between hover:bg-gray-100 px-6 py-5 max-sm:pt-10 shadow-sm rounded-lg'
              >
                <div className='flex items-center max-sm:mt-5'>
                  <Image
                    alt='product'
                    width={100}
                    height={100}
                    src={cartItem.item.media[0]}
                    className='w-32 h-32 object-cover rounded-lg'
                  />

                  <div className="flex flex-col gap-3 ml-4">
                    <span className='font-bold max-sm:absolute max-sm:top-1 max-sm:left-6 max-sm:max-w-48'>{cartItem.item.title}</span>

                    {cartItem.color && (
                      <span>
                        <span className="text-gray-500 max-sm:text-sm">Color:</span>
                        <span className="font-semibold max-sm:text-sm"> {cartItem.color}</span>
                      </span>
                    )}

                    {cartItem.size && (
                      <span>
                        <span className="text-gray-500 max-sm:text-sm">Size:</span>
                        <span className="font-semibold max-sm:text-sm"> {cartItem.size}</span>
                      </span>
                    )}

                    <div>
                      <span className="text-gray-500 max-sm:text-sm">Price:</span>
                      <span className='font-semibold max-sm:text-sm'>{` ${cartItem.item.price}`}</span>
                    </div>
                  </div>
                </div>

                <div className='flex items-end justify-end max-sm:items-center max-sm:justify-center max-sm:gap-12 p-2 gap-4 text-2xl'>
                  <MinusCircle
                    size={32}
                    className='cursor-pointer hover:text-blue-500'
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <span className='text-gray-500 cursor-pointer'>{cartItem.quantity}</span>
                  <PlusCircle
                    size={32}
                    className='cursor-pointer hover:text-blue-500'
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>


                <div className='flex absolute max-sm:top-1 max-sm:right-1 top-3 right-3'>
                  <X
                    className='cursor-pointer border border-transparent hover:text-red-500 hover:border hover:border-red-500 hover:rounded-full'
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5'>
        <span className='text-2xl font-bold pb-4'>
          Summary
          <span>
            {` (${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}
          </span>
        </span>

        <div className='flex justify-between font-semibold'>
          <span>
            Total Amount
          </span>
          <span>
            $ {totalRounded}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className='boder w-full bg-white font-bold py-3 rounded-lg hover:bg-black hover:text-white transition-colors'
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart