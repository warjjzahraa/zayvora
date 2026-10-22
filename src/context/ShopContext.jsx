
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage("zayvora-cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    readStorage("zayvora-wishlist", [])
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("zayvora-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "zayvora-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToCart = useCallback((product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your bag`);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  }, []);

  const changeQuantity = useCallback((id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + amount
                ),
              }
            : item
        )
    );
  }, []);

  const toggleWishlist = useCallback((product) => {
    let added = false;

    setWishlist((current) => {
      const exists = current.some(
        (item) => item.id === product.id
      );

      added = !exists;

      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
    });

    setNotice(
      added
        ? `${product.name} saved to your wishlist`
        : `${product.name} removed from your wishlist`
    );
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  const cartCount = useMemo(
    () =>
      cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const wishlistCount = wishlist.length;

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const value = {
    cart,
    wishlist,
    cartCount,
    wishlistCount,
    subtotal,
    cartOpen,
    setCartOpen,
    notice,
    setNotice,
    addToCart,
    removeFromCart,
    changeQuantity,
    toggleWishlist,
    isWishlisted,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}
