import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }, [cart]);


    // ==========================================
    // AGREGAR AL CARRITO
    // ==========================================

    const addToCart = (item) => {

        setCart((prevCart) => {

            const stock = Number(item.stock);

            // No permitir productos sin stock
            if (
                !Number.isFinite(stock) ||
                stock <= 0
            ) {
                return prevCart;
            }

            const existingItem = prevCart.find(
                (p) =>
                    p.productId === item.productId &&
                    p.sizeId === item.sizeId
            );

            // YA EXISTE EN EL CARRITO
            if (existingItem) {

                const newQuantity =
                    existingItem.quantity +
                    item.quantity;

                // No superar stock disponible
                if (newQuantity > stock) {
                    return prevCart;
                }

                return prevCart.map((p) =>
                    p.productId === item.productId &&
                    p.sizeId === item.sizeId
                        ? {
                              ...p,
                              quantity: newQuantity,

                              // Actualizamos también
                              // el stock conocido
                              stock
                          }
                        : p
                );
            }

            // PRODUCTO NUEVO

            const quantity = Math.min(
                item.quantity,
                stock
            );

            return [
                ...prevCart,
                {
                    ...item,
                    quantity,
                    stock
                }
            ];
        });
    };


    // ==========================================
    // AUMENTAR CANTIDAD
    // ==========================================

    const increaseQuantity = (
        productId,
        sizeId
    ) => {

        setCart((prevCart) =>
            prevCart.map((item) => {

                if (
                    item.productId !== productId ||
                    item.sizeId !== sizeId
                ) {
                    return item;
                }

                const stock = Number(item.stock);

                // Si llegó al máximo,
                // no aumentar
                if (
                    Number.isFinite(stock) &&
                    item.quantity >= stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            })
        );
    };


    // ==========================================
    // DISMINUIR CANTIDAD
    // ==========================================

    const decreaseQuantity = (
        productId,
        sizeId
    ) => {

        setCart((prevCart) =>
            prevCart
                .map((item) => {

                    if (
                        item.productId === productId &&
                        item.sizeId === sizeId
                    ) {
                        return {
                            ...item,
                            quantity:
                                item.quantity - 1
                        };
                    }

                    return item;
                })
                .filter(
                    (item) => item.quantity > 0
                )
        );
    };


    // ==========================================
    // ELIMINAR
    // ==========================================

    const removeFromCart = (
        productId,
        sizeId
    ) => {

        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(
                        item.productId === productId &&
                        item.sizeId === sizeId
                    )
            )
        );
    };


    // ==========================================
    // VACIAR
    // ==========================================

    const clearCart = () => {
        setCart([]);
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {
    return useContext(CartContext);
}