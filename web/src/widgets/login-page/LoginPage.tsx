"use client";

import { useState } from "react";
import { EmailLoginForm } from "@/features/auth/email-login";
import { PhoneLoginForm } from "@/features/auth/phone-login";
import { SocialLoginButtons } from "@/features/auth/social-login";

type LoginMode = "email" | "phone" | "signup";

export const LoginPage = () => {
  const [mode, setMode] = useState<LoginMode>("email");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {mode === "signup" ? "회원가입" : "로그인"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            원하는 방법으로 시작하세요
          </p>
        </div>

        {/* 탭 전환 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setMode("email")}
            className={`flex-1 py-2 text-sm font-medium ${
              mode === "email"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            이메일
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`flex-1 py-2 text-sm font-medium ${
              mode === "phone"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            전화번호
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-medium ${
              mode === "signup"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* 이메일 로그인 */}
        {mode === "email" && <EmailLoginForm mode="login" />}

        {/* 회원가입 */}
        {mode === "signup" && <EmailLoginForm mode="signup" />}

        {/* 전화번호 로그인 */}
        {mode === "phone" && <PhoneLoginForm />}

        {/* 소셜 로그인 구분선 */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <SocialLoginButtons />
      </div>
    </main>
  );
};
