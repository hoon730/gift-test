"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui";
import { mockGifts } from "@/shared/lib/mockData";
import { useCart } from "@/shared/lib/cart";

export const CartPage = () => {
  const { cart, loading, removeFromCart } = useCart();

  const cartItems = useMemo(() => {
    return mockGifts.filter((gift) => cart.includes(gift.id));
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cartItems]);

  if (loading) {
    return (
      <main className="container-custom py-20">
        <div className="text-center">
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container-custom py-20">
        <div className="max-w-md mx-auto text-center">
          <svg
            className="w-24 h-24 mx-auto text-neutral-300 mb-6"
            fill="none"
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
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            장바구니가 비어있습니다
          </h2>
          <p className="text-neutral-600 mb-8">
            마음에 드는 선물을 장바구니에 담아보세요
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">장바구니</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 아이템 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 flex gap-6"
              >
                {/* 이미지 */}
                <Link href={`/gift/${item.id}`} className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-neutral-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* 정보 */}
                <div className="flex-1 flex flex-col">
                  <Link href={`/gift/${item.id}`}>
                    <h3 className="text-lg font-semibold text-neutral-900 hover:text-accent-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-bold text-neutral-900">
                      {item.price?.toLocaleString()}원
                    </p>
                    <button
                      onClick={async () => await removeFromCart(item.id)}
                      className="text-sm text-neutral-500 hover:text-red-600 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                주문 요약
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>상품 금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>배송비</span>
                  <span className="text-accent-600">무료</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-neutral-900">
                    <span>총 결제 금액</span>
                    <span className="text-accent-600">
                      {totalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full">
                  주문하기 ({cartItems.length}개)
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" size="md" className="w-full mt-3">
                  쇼핑 계속하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
