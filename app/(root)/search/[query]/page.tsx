import ProductCard from "@/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
    const { query } = await params; 
    const decodedQuery = decodeURIComponent(query);
    
   
    const searchedProducts = await getSearchedProducts(query);
    if (searchedProducts === null) {
        return (
            <div className="px-10 py-5">
                <h1 className="font-bold text-sm my-10">Search results for "{decodedQuery}"</h1>
                <p className="font-bold text-sm my-5 text-red-500">
                    Failed to load search results. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="px-10 py-5">
            <h1 className="font-bold text-sm my-10">Search results for "{decodedQuery}"</h1>
            
            {searchedProducts.length === 0 ? (
                <p className="font-bold text-sm my-5 text-gray-500">No result found</p>
            ) : (
                <div className="flex flex-wrap justify-start gap-16">
                    {searchedProducts.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;