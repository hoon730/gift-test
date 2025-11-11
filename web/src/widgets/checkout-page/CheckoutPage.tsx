"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/shared/ui";
import { mockGifts } from "@/shared/lib/mockData";
import { useCart } from "@/shared/lib/cart";

export const CheckoutPage = () => {
  const router = useRouter();
  const { cart, loading, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const cartItems = useMemo(() => {
    return mockGifts.filter((gift) => cart.includes(gift.id));
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 실제로는 여기서 결제 API를 호출해야 합니다
    alert("주문이 완료되었습니다! (데모 버전)");

    // 장바구니 비우기
    await clearCart();

    // 홈으로 이동
    router.push("/");
  };

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
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            장바구니가 비어있습니다
          </h2>
          <p className="text-neutral-600 mb-8">
            주문할 상품을 먼저 장바구니에 담아주세요
          </p>
          <Button variant="primary" size="lg" onClick={() => router.push("/")}>
            쇼핑하러 가기
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">주문/결제</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 배송 정보 입력 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  배송 정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      받는 사람
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      배송 주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="주소를 입력하세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      배송 메모 (선택)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="배송 시 요청사항을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              {/* 주문 상품 목록 */}
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">
                  주문 상품 ({cartItems.length}개)
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-neutral-200 last:border-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-neutral-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mt-1">
                          {item.price?.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* 결제 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                결제 금액
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

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
              >
                {totalPrice.toLocaleString()}원 결제하기
              </Button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                주문 정보를 확인했으며, 결제에 동의합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
