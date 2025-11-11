"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { useAuthStore } from "@/shared/store/authStore";
import { logout } from "@/shared/lib/auth";
import { useCart } from "@/shared/lib/cart";

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-neutral-900">
              선물
            </div>
          </Link>

          {/* 네비게이션 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/explore"
              className="text-sm font-medium text-neutral-700 hover:text-accent-700 transition-colors"
            >
              둘러보기
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-neutral-700 hover:text-accent-700 transition-colors"
            >
              카테고리
            </Link>
            <Link
              href="/curation"
              className="text-sm font-medium text-neutral-700 hover:text-accent-700 transition-colors"
            >
              큐레이션
            </Link>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center space-x-3">
            {/* 장바구니 아이콘 */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="w-6 h-6 text-neutral-700"
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
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {loading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-medium">
                    {user.displayName?.[0] || user.email?.[0] || "?"}
                  </div>
                  <span className="text-sm font-medium text-neutral-900 hidden md:block">
                    {user.displayName || user.email || "사용자"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {user.displayName || "사용자"}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        프로필
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        주문 내역
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLogin}>
                  로그인
                </Button>
                <Button variant="primary" size="sm" onClick={handleLogin}>
                  시작하기
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
