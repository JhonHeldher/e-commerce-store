import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions"
import Image from "next/image"

const CollectionDetails = async ({ params }: { params: { collectionId: string }}) => {
    const CollectionDetails = await getCollectionDetails(params.collectionId);


    return (
        <div className="px-10 py-5 text-gray-500 flex flex-col items-center gap-8">
            <Image
                src={CollectionDetails.image}
                width={1500}
                height={1000}
                alt="collection"
                className="w-full h-[400px] object-cover rounded-xl"
            />

            <span className="text-2xl font-bold">{CollectionDetails.title}</span>
            <span className="text-center max-w-[900px]">{CollectionDetails.description}</span>

            <div className="flex flex-wrap mx-auto gap-16">
                {CollectionDetails.products.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
};
export default CollectionDetails;

export const dynamic = "force-dynamic";