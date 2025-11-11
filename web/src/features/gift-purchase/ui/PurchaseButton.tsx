"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { useCart } from "@/shared/lib/cart";

export interface IPurchaseButtonProps {
  giftId: string;
  className?: string;
}

export const PurchaseButton = ({ giftId, className }: IPurchaseButtonProps) => {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

  const handlePurchase = async () => {
    // 장바구니에 상품 추가 (이미 있지 않다면)
    if (!isInCart(giftId)) {
      await addToCart(giftId);
    }

    // 결제 페이지로 이동
    router.push("/checkout");
  };

  return (
    <Button
      variant="primary"
      size="lg"
      className={className}
      onClick={handlePurchase}
    >
      바로 구매하기
    </Button>
  );
};
