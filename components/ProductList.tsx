import { getProducts } from "@/lib/actions/actions"
import ProductCard from "./ProductCard"
const ProductList = async () => {
    const products = await getProducts()

    return (
        <div className="flex flex-col items-center gap-10 py-8 px-5">
            <span className="text-2xl font-bold">
                Products
            </span>
            {!products || products.length === 0 ?
                <span className="text-2xl font-bold">No products found"</span>
                : (
                    <div className="flex flex-wrap mx-auto gap-16">
                        {products.map((product: ProductType) => (
                           <ProductCard key={product._id} product={product} /> 
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ProductList
