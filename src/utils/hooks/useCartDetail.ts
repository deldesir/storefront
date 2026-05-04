"use client";

import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, clearCart } from "@/store/slices/cart-slice";
import { useCallback, useEffect, useState, useRef } from "react";
import { GET_CART_ITEM } from "@/graphql";
import { getCartToken } from "@/utils/getCartToken";
import { GUEST_CART_TOKEN } from "@/utils/constants";



export function useCartDetail() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartDetail.cart);
  const [isInFlight, setIsInFlight] = useState(false);
  const isInFlightRef = useRef(false);
  // Track if cart was determined to be stale to prevent infinite retries
  const isStaleRef = useRef(false);

  const [getCartDetailMutation, { data, loading: isLoading, error }] =
    useMutation(GET_CART_ITEM, {
      onCompleted: (response) => {
        const cartData = response?.createReadCart?.readCart;
        if (cartData) {
          dispatch(addItem(cartData));
        }
      },
      onError: (error) => {
        console.error("Cart detail error:", error);
        // If the cart is not found, the token is stale — clear it to stop retries
        if (error?.message?.toLowerCase().includes("cart not found")) {
          isStaleRef.current = true;
          dispatch(clearCart());
          // Remove the stale guest cart token cookie
          document.cookie = `${GUEST_CART_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
      },
    });

  const getCartDetail = useCallback(async () => {
    const token = getCartToken();
    if (!token || isStaleRef.current) {
      return;
    }

    if (isInFlightRef.current) return;

    isInFlightRef.current = true;
    setIsInFlight(true);
    try {
      await getCartDetailMutation();
    } catch (_e) {
      // swallow — onError already handles it
    } finally {
      isInFlightRef.current = false;
      setIsInFlight(false);
    }
  }, [getCartDetailMutation]);

  useEffect(() => {
    if (!cart && !isInFlightRef.current && !isStaleRef.current) {
      getCartDetail();
    }
  }, [cart, getCartDetail]);

  return {
    cartData: cart || data?.createReadCart?.readCart,
    getCartDetail,
    isLoading: isLoading || (isInFlight && !cart),
    error,
  };
}

