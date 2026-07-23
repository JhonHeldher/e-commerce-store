import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";

type Props = {
  params: {
    productId: string;
  };
};

const ProductDetails = async ({ params }: Props) => {
  const { productId } = await Promise.resolve(params);

  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <>
      {/* Detalhes do Produto Principal */}
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      {/* Seção de Produtos Relacionados */}
      <div className="flex flex-col items-center px-10 py-10 max-md:px-3 border-t border-gray-100 mt-10">
        {/* 🟢 Título estilizado */}
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Related Products
        </p>

        {/* Lista de Produtos Relacionados */}
        {relatedProducts && relatedProducts.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8 mx-auto mt-8 max-w-7xl">
            {relatedProducts.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            No related products found.
          </p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
