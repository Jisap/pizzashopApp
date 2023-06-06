import React, { useContext, useEffect } from "react";
import { IoCloseOutline } from 'react-icons/io5';
import CheckoutDetails from "./CheckoutDetails";
import Modal from 'react-modal';
import { CartContext } from "../context/CartContext";



const CartBottom = () => {

  const { setIsOpen, cart } = useContext( CartContext )


  return (
    <>
      { cart.length >= 1 ? (
        <div className="px-6 py-3 lg:py6 mt-auto">
          {/* total price */}
          <div className="flex">
            <div>Total:</div>
            <div>$320</div>
          </div>
          {/* btn */}
          <div className="flex flex-col gap-y-3">
            <button className="btn btn-lg font-semibold gradient flex justify-center">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}
    </>
  )
};

export default CartBottom;
