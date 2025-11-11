"use client";

import { useState } from "react";
import { useCart } from "@/shared/lib/cart";

export interface ICartButtonProps {
  giftId: string;
  className?: string;
}

export const CartButton = ({ giftId, className = "" }: ICartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const toggleCart = async () => {
    if (isInCart(giftId)) {
      // 장바구니에서 제거
      await removeFromCart(giftId);
    } else {
      // 장바구니에 추가
      await addToCart(giftId);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className={className}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill={isInCart(giftId) ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        장바구니
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-accent-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          장바구니에 추가되었습니다!
        </div>
      )}
    </>
  );
};
