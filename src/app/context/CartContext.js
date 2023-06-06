'use client'

import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);

    //add to cart
    const addToCart = (id, image, name, price, additionalTopping, size, crust) => { 
        // sort additionalTopping array by name
        additionalTopping.sort((a,b) => a.name.localeCompare(b.name));
        const newItem = {
            id, image, name, price, additionalTopping, size, crust, amount:1
        }
        setCart([...cart, newItem])
    };

    console.log(cart)

    return <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cart }}>
        { children }
    </CartContext.Provider>
}

export default CartProvider