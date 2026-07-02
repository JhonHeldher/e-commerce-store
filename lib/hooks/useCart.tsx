import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string; 
  size?: string; 
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  // Atualizado: Agora precisamos passar cor e tamanho para identificar a variação exata
  removeItem: (idToRemove: string, color?: string, size?: string) => void;
  increaseQuantity: (idToIncrease: string, color?: string, size?: string) => void;
  decreaseQuantity: (idToDecrease: string, color?: string, size?: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems; 

        // 🔥 CORREÇÃO: Verifica ID, Cor e Tamanho combinados
        const isExisting = currentItems.find(
          (cartItem) => 
            cartItem.item._id === item._id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (isExisting) {
          return toast("Item already in cart with this color and size");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒" });
      },

      removeItem: (idToRemove: string, color?: string, size?: string) => {
        // 🔥 CORREÇÃO: Remove apenas o item que bate com o ID, cor e tamanho exatos
        const newCartItems = get().cartItems.filter(
          (cartItem) => !(
            cartItem.item._id === idToRemove && 
            cartItem.color === color && 
            cartItem.size === size
          )
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },

      increaseQuantity: (idToIncrease: string, color?: string, size?: string) => {
        // 🔥 CORREÇÃO: Altera a quantidade apenas da variação correta
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease && cartItem.color === color && cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },

      decreaseQuantity: (idToDecrease: string, color?: string, size?: string) => {
        // 🔥 CORREÇÃO: Altera a quantidade apenas da variação correta
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease && cartItem.color === color && cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;