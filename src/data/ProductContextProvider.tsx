import React, { useEffect, useState } from "react";
import ProductsContext, { Product, Wishlist, History } from "./product-context";


interface ProductsContextProviderProps {
    children: React.ReactNode;
}

const ProductsContextProvider: React.FC<ProductsContextProviderProps> = props => {

    const [products, setProducts] = useState<Product[]>([
        { id: "f1", name: 'Air Jordan 1 High Travis Scott', price: 1908, src: './product/TravisScott.png' },
        { id: "f2", name: 'Air Jordan 1 Low x DIOR', price: 7631, src: './product/Dior.png' },
        { id: "f3", name: 'New Balance 327 Nightwatch Green', price: 114, src: './product/NightwatchGreen.png' },
        { id: "f4", name: 'Air Max 97 White', price: 152, src: './product/AirMax97.png' },
        { id: "f5", name: 'Adidas NMD R1', price: 146, src: './product/NMDR1.png' },
        { id: 'f6', name: 'Air Jordan 1 Low Smoke Grey', price: 178, src: "./product/SmokeGrey.png" }
    ]);

    const [wishlist, setWishlist] = useState<Wishlist[]>([]);

    const [cart, setCart] = useState<Cart[]>([]);

    const [history, setHistory] = useState<History[]>([]);

    const addHistory = (product: Cart[]) => {

        const newHistory: History = {
            id: "TRX" + Math.floor(Math.random() * 1000).toString(),
            cart: product,
            // hitung total price dari cart dan masukkan ke dalam variable total
            total: product.reduce((total, item) => total + item.price * item.qty, 0)
        }

        setHistory((prevHistory) => {
            console.log(newHistory);
            return prevHistory.concat(newHistory);
        });
    };

    const addWishlist = (product: Product) => {
        const newWishlist: Wishlist = {
            id: product.id,
            name: product.name,
            price: product.price,
            src: product.src
        }

        setWishlist((prevWishlist) => {
            return prevWishlist.concat(newWishlist);
        });
    };

    interface Cart {
        id: string,
        name: string,
        price: number,
        qty: number,
        src: string,
        total?: number
    }

    const addToCart = (product: Product) => {
        const newCart: Cart = {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            src: product.src
        }

        setCart((prevCart) => {
            return prevCart.concat(newCart);
        });
    }

    const addQty = (product: Cart) => {
        setCart((prevCart) => {
            const cartIndex = prevCart.findIndex(p => p.id === product.id);
            const updatedCarts = [...prevCart];
            const updatedCart = { ...updatedCarts[cartIndex] };
            updatedCart.qty++;
            updatedCarts[cartIndex] = updatedCart;
            return updatedCarts;
        });
    }

    const removeQty = (product: Cart) => {
        setCart((prevCart) => {
            const cartIndex = prevCart.findIndex(p => p.id === product.id);
            const updatedCarts = [...prevCart];
            const updatedCart = { ...updatedCarts[cartIndex] };
            updatedCart.qty--;
            updatedCarts[cartIndex] = updatedCart;
            return updatedCarts;
        });
    }

    const removeProduct = (product: Cart) => {
        setCart((prevCart) => {
            const cartIndex = prevCart.findIndex(p => p.id === product.id);
            const updatedCart = [...prevCart];
            updatedCart.splice(cartIndex, 1);
            return updatedCart;
        });
    }

    const removeWishlist = (product: Wishlist) => {
        setWishlist((prevWishlist) => {
            const wishlistIndex = prevWishlist.findIndex(p => p.id === product.id);
            const updatedWishlist = [...prevWishlist];
            updatedWishlist.splice(wishlistIndex, 1);
            return updatedWishlist;
        });
    }

    const clearCart = () => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart.splice(0, updatedCart.length);
            return updatedCart;
        });
    }

    return (
        <ProductsContext.Provider value={{
            products: products,
            wishlist: wishlist,
            carts: cart,
            history: history,
            addToCart: addToCart,
            addQty: addQty,
            addHistory: addHistory,
            removeQty: removeQty,
            clearCart: clearCart,
            removeProduct: removeProduct,
            addWishlist: addWishlist,
            removeWishlist: removeWishlist
        }}>
            {props.children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;