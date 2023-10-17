import React from "react";

export interface Product {
    id: string,
    name: string,
    price: number,
    src: string
}

export interface Wishlist {
    id: string,
    name: string,
    price: number,
    src: string
}

export interface Cart {
    id: string,
    name: string,
    price: number,
    qty: number,
    src: string
}

export interface History {
    id: string,
    cart: Cart[],
    total: number,
}

interface ProductsContext {
    products: Product[];
    wishlist: Wishlist[];
    carts: Cart[];
    history: History[];
    addToCart: (product: Product) => void;
    addWishlist: (product: Product) => void;
    addHistory: (product: Cart[]) => void;
    addQty: (product: Cart) => void;
    clearCart: () => void;
    removeProduct: (product: Cart) => void;
    removeQty: (product: Cart) => void;
    removeWishlist: (product: Wishlist) => void;
}

const ProductsContext = React.createContext<ProductsContext>({
    products: [],
    wishlist: [],
    carts: [],
    history: [],
    addToCart: () => {},
    addQty: () => {},
    addHistory: () => {},
    removeQty: () => {},
    clearCart: () => {},
    removeProduct: () => {},
    addWishlist: () => {},
    removeWishlist: () => {}
});

export default ProductsContext;
