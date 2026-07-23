"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"


const wishlist = () => {
    const { user } = useUser()

    const [loading, setLoading] = useState(true)
    const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
    const [wishlist, setWishlist] = useState<ProductType[]>([])

    const getUser = async () => {
        try {
            const res = await fetch("/api/users")
            const data = await res.json()
            setSignedInUser(data)
            setLoading(false)

        } catch (err) {
            console.log("users_GET", err)
        }
    }

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [user])

    const getWishlistProducts = async () => {
        setLoading(true)

        if (!signedInUser) return

        const WishlistProducts = await Promise.all(signedInUser.wishlist.map(async (productId) => {
            const res = await getProductDetails(productId)

            return res
        }))
        setWishlist(WishlistProducts)
        setLoading(false)
    }



    useEffect(() => {
        if (signedInUser) {
            getWishlistProducts()
        }
    }, [signedInUser])

    const updateSignedInUser = (updatedUser: UserType) => {
        setSignedInUser(updatedUser)
    }

    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <span className="text-2xl font-bold text-gray-500">Your Wishlist</span>
            {wishlist.length === 0 && (
                <span>No itens in your wishlist</span>
            )}

            <div className="flex flex-wrap justify-center gap-16">
                {wishlist.map((product) => (
                    <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
                ))}

            </div>

        </div>
    )
}

export default wishlist