"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const useCart = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 로컬 스토리지에서 장바구니 가져오기
  const getLocalCart = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };

  // 로컬 스토리지에 장바구니 저장
  const saveLocalCart = (items: string[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Firestore에서 장바구니 가져오기
  const getFirestoreCart = async (uid: string): Promise<string[]> => {
    try {
      const cartRef = doc(db, "carts", uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        return cartSnap.data().items || [];
      }
      return [];
    } catch (error) {
      console.error("Firestore에서 장바구니 가져오기 실패:", error);
      return [];
    }
  };

  // Firestore에 장바구니 저장
  const saveFirestoreCart = async (uid: string, items: string[]) => {
    try {
      const cartRef = doc(db, "carts", uid);
      await setDoc(cartRef, {
        items,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Firestore에 장바구니 저장 실패:", error);
    }
  };

  // 로컬 스토리지 → Firestore 마이그레이션
  const migrateLocalToFirestore = async (uid: string) => {
    const localCart = getLocalCart();

    if (localCart.length > 0) {
      // Firestore에 있는 장바구니와 병합
      const firestoreCart = await getFirestoreCart(uid);
      const mergedCart = Array.from(new Set([...firestoreCart, ...localCart]));

      // Firestore에 저장
      await saveFirestoreCart(uid, mergedCart);

      // 로컬 스토리지 비우기
      saveLocalCart([]);

      return mergedCart;
    }

    return await getFirestoreCart(uid);
  };

  // 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 로그인 상태
        setUserId(user.uid);

        // 로컬 스토리지 → Firestore 마이그레이션
        const migratedCart = await migrateLocalToFirestore(user.uid);
        setCart(migratedCart);
      } else {
        // 비로그인 상태
        setUserId(null);
        setCart(getLocalCart());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 장바구니에 아이템 추가
  const addToCart = async (giftId: string) => {
    if (cart.includes(giftId)) return;

    const updatedCart = [...cart, giftId];
    setCart(updatedCart);

    if (userId) {
      // 로그인 상태: Firestore에 저장
      await saveFirestoreCart(userId, updatedCart);
    } else {
      // 비로그인 상태: 로컬 스토리지에 저장
      saveLocalCart(updatedCart);
    }
  };

  // 장바구니에서 아이템 제거
  const removeFromCart = async (giftId: string) => {
    const updatedCart = cart.filter((id) => id !== giftId);
    setCart(updatedCart);

    if (userId) {
      // 로그인 상태: Firestore에 저장
      await saveFirestoreCart(userId, updatedCart);
    } else {
      // 비로그인 상태: 로컬 스토리지에 저장
      saveLocalCart(updatedCart);
    }
  };

  // 장바구니 비우기
  const clearCart = async () => {
    setCart([]);

    if (userId) {
      // 로그인 상태: Firestore에 저장
      await saveFirestoreCart(userId, []);
    } else {
      // 비로그인 상태: 로컬 스토리지에 저장
      saveLocalCart([]);
    }
  };

  // 장바구니에 아이템이 있는지 확인
  const isInCart = (giftId: string): boolean => {
    return cart.includes(giftId);
  };

  return {
    cart,
    loading,
    userId,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  };
};
