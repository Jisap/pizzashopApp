'use client'

import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    //add to cart
    const addToCart = (id, image, name, price, additionalTopping, size, crust) => { 
        // sort additionalTopping array by name
        additionalTopping.sort((a,b) => a.name.localeCompare(b.name));
        const newItem = { id, image, name, price, additionalTopping, size, crust, amount:1 };   // newItem que se pretende agregar al carrito

        const cartItemIndex = cart.findIndex((item) =>                                          // Determinamos si el item estaba ya o no en el carrito            
            item.id === id &&                                                                   // findIndex devuelve -1 si las condiciones no se cumplen
            item.price === price &&                                                             // es decir si los arg no coinciden con ningun elemento del carrito
            item.size === size &&                                                               // findIndex devuelve +1 si las condiciones si se cumplen
            // check if additionalTopping arrray is equal                                       // es decir si los arg si coinciden con algun elemento del carrito    
            JSON.stringify(item.additionalTopping) === JSON.stringify(additionalTopping) &&
            item.crust === crust
        );

        if( cartItemIndex === -1 ){                     // Entonces si el item no estaba en el carrito se añade a los elementos del carrito existente.
            setCart([...cart, newItem]);
        }else{
            const newCart = [...cart]                   // Si el item si que estaba en el carrito solo modificamos la cantidad de ese item existente.
            newCart[cartItemIndex].amount += 1;
            setCart(newCart)
        }

        // open the cart everytime you add a product
        setIsOpen(true);
    };

    // remove item
    const removeItem = ( id, price, crust ) => {
        const itemIndex = cart.findIndex(
            (item) => item.id ===id && item.price === price && item.crust === crust    
        )
        if(itemIndex !== -1){               // Si findIndex = 1 quiere decir que se encontro el índice del item a borrar -> splice de newCart en la posición itemIndex
            const newCart = [...cart];
            newCart.splice(itemIndex, 1);
            setCart(newCart);
        }
    }

    // increase amount
    const increaseAmount = (id, price) => {
        const itemIndex = cart.findIndex(
            (item) => item.id === id && item.price === price 
        )
        if(itemIndex !== -1){
            const newCart = [...cart];
            newCart[itemIndex].amount += 1;
            setCart(newCart);
        }
    }

    // decrease amount
    const decreaseAmount = (id, price) => {
        const itemIndex = cart.findIndex(
            (item) => item.id === id && item.price === price
        )
        if (itemIndex !== -1) {
            const newCart = [...cart];
            if(newCart[itemIndex].amount > 1){
                newCart[itemIndex].amount -= 1;
                setCart(newCart);
                
            }
        }
    }

    return <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cart, removeItem, increaseAmount, decreaseAmount }}>
        { children }
    </CartContext.Provider>
}

export default CartProvider