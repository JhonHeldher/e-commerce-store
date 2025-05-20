"use client"

import useCart from "@/lib/hooks/useCart"
import Link from "next/link"
import { useEffect } from "react"

const SuccessfulPayment = () => {
    const cart = useCart()

    useEffect(() => {
        cart.clearCart()
    }, [])
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <span className="text-2xl font-bold text-Blue-500">
                Successful Payment
            </span>
            <span>
                Your payment was successful
            </span>
            <Link
                href="/"
                className="p-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
                CONTINUE TO SHOPPING
            </Link>

        </div>
    )
}

export default SuccessfulPayment