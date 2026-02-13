import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string | null;
  };
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        products (
          name,
          price,
          image_url
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
      return;
    }

    setItems(
      data.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: {
          name: item.products.name,
          price: item.products.price,
          image_url: item.products.image_url,
        },
      }))
    );
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    const existingItem = items.find((item) => item.product_id === productId);

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productId,
        quantity: 1,
      });

      if (error) {
        toast.error("Failed to add item to cart");
        console.error(error);
        return;
      }

      toast.success("Added to cart");
      await refreshCart();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to remove item");
      console.error(error);
      return;
    }

    toast.success("Removed from cart");
    await refreshCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to update quantity");
      console.error(error);
      return;
    }

    await refreshCart();
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
