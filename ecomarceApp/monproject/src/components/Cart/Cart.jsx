/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useContext } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  let { getCartItems, removeCartItem, updateCartItem } = useContext(CartContext);
  const [counter, setCounter] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);

  async function getcart() {
    let response = await getCartItems();
    console.log("Cart Details:", response.data);
    setCartDetails(response.data);
  }
  async function updatecart(productId, newQuantity) {
    if (newQuantity < 1) {
      removeItem(productId);
    }
    let response = await updateCartItem(productId, newQuantity);
    setCartDetails(response.data);
  }
  async function removeItem(productId) {
    let response = await removeCartItem(productId);
    console.log(response);
    setCartDetails(response.data);
  }
  useEffect(() => {
    getcart();
  }, []);
  return (
    <>
      <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-sm text-left text-gray-600">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4 text-center">Quantity</th>
              <th className="px-6 py-4 text-center">Price</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {cartDetails?.data.products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                {/* Image */}
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    alt={product.product.title}
                  />
                </td>

                {/* Title */}
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {product.product.title}
                </td>

                {/* Quantity */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button  onClick={()=> updatecart(product.product.id, product.count - 1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition">
                      −
                    </button>

                    <span className="font-medium text-gray-800">
                      {product.count}
                    </span>
                    <button onClick={()=> updatecart(product.product.id, product.count + 1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition">
                      +
                    </button>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                  {product.price} EGP
                </td>

                {/* Remove */}
                <td className="px-6 py-4 text-center">
                  <span
                    onClick={() => removeItem(product.product.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
