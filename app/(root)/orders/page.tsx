import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Orders = async () => {
  // 1. Pega o userId atual do Clerk
  const { userId } = await auth();

  // Redireciona para o login se o usuário não estiver autenticado
  if (!userId) {
    redirect("/sign-in");
  }

  // 2. Busca as ordens do usuário
  const orders = await getOrders(userId);

  return (
    <div className="px-10 py-8 max-w-5xl mx-auto max-sm:px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 my-6">
        Your Orders
      </h1>

      {!orders || orders.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <p className="text-gray-500 font-medium">You have no orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders?.map((order: OrderType) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-6"
            >
              <div className="w-full flex flex-col justify-between">
                {/* Header do Order (ID e Badge) */}
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Order ID
                    </span>
                    <p className="font-bold text-gray-800 break-all text-sm sm:text-base">
                      {order._id}
                    </p>
                  </div>
                  <span className="px-3 py-1 flex items-center text-xs font-medium rounded-full bg-green-50 text-green-600 border border-green-200">
                    Paid
                  </span>
                </div>

                {/* Lista de Produtos */}
                <div className="flex flex-col gap-6 my-4">
                  {[...order.products]
                    .sort((a, b) =>
                      a.product.title.localeCompare(b.product.title),
                    )
                    .map((orderItem: OrderItemType, index: number) => (
                      <div
                        key={`${orderItem.product._id}-${orderItem.color}-${orderItem.size}-${index}`}
                        className="flex gap-4 items-center group cursor-pointer"
                      >
                        {/* Imagem do Produto com Zoom */}
                        <div className="overflow-hidden rounded-lg shrink-0">
                          <Image
                            src={orderItem.product.media[0]}
                            alt={orderItem.product.title}
                            width={128}
                            height={128}
                            className="w-28 h-28 sm:w-32 sm:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Detalhes do Produto */}
                        <div className="flex flex-col justify-center gap-1 text-sm text-gray-500">
                          <p className="font-semibold text-gray-800 text-base">
                            Title:{" "}
                            <span className="font-bold text-gray-900">
                              {orderItem.product.title}
                            </span>
                          </p>

                          {orderItem.color && (
                            <p className="font-medium text-gray-600">
                              Color:{" "}
                              <span className="font-semibold text-gray-800">
                                {orderItem.color}
                              </span>
                            </p>
                          )}

                          {orderItem.size && (
                            <p className="font-medium text-gray-600">
                              Size:{" "}
                              <span className="font-semibold text-gray-800">
                                {orderItem.size}
                              </span>
                            </p>
                          )}

                          <p className="font-medium text-gray-600">
                            Unit price:{" "}
                            <span className="font-semibold text-gray-800">
                              R$ {orderItem.product.price}
                            </span>
                          </p>

                          <p className="font-medium text-gray-600">
                            Quantity:{" "}
                            <span className="font-semibold text-gray-800">
                              {orderItem.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer do Order (Valor Total) */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    R$ {order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
