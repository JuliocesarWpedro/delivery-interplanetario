'use client';

import React from 'react';

interface CartContextProps {
  cartItems: Address[];
  setCartItems: React.Dispatch<React.SetStateAction<Address[]>>;
  updateLocalStorage: (newValue: Address[]) => void;
  updateCartItem: (addressUpdated: Address) => void;
  handleDeleteItem: (id: number) => void;
  handleAddToCart: (product: Address) => void;
}

interface Address {
  planet: string;
  fullName: string;
  mobilePhone: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  type: string;
  id: number;
  batch: string;
}

export const CartContext = React.createContext<CartContextProps | undefined>(
  undefined,
);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = React.useState<Address[]>([]);

  React.useEffect(() => {
    const storedCart = localStorage.getItem('addressData');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const updateLocalStorage = (newValue: Address[]) => {
    setCartItems(newValue);
    localStorage.setItem('addressData', JSON.stringify(newValue));
  };

  const updateCartItem = (addressUpdated: Address) => {
    let cartItems = localStorage.getItem('addressData');
    let cartItemsArray: Address[] = [];

    if (cartItems) {
      cartItemsArray = JSON.parse(cartItems);
      const existingProductIndex = cartItemsArray.findIndex(
        (item: Address) => item.id === addressUpdated.id,
      );

      if (existingProductIndex !== -1) {
        cartItemsArray[existingProductIndex] = addressUpdated;
      } else {
        cartItemsArray.push(addressUpdated);
      }
    } else {
      cartItemsArray.push(addressUpdated);
    }
    updateLocalStorage(cartItemsArray);
  };

  const handleAddToCart = (product: Address) => {
    const idProduct = Number(product.id);
    let cartItems = localStorage.getItem('addressData');
    if (cartItems) {
      let cartItemsArray = JSON.parse(cartItems);
      let existingProductIndex = cartItemsArray.findIndex(
        (item: { id: number }) => item.id === idProduct,
      );
      if (existingProductIndex !== -1) {
      } else {
        cartItemsArray.push({ ...product, id: idProduct });
        updateLocalStorage(cartItemsArray);
      }
    } else {
      const newCart = [{ ...product }];
      updateLocalStorage(newCart);
    }
  };

  const handleDeleteItem = (id: number) => {
    const newValue = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(newValue);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        updateLocalStorage,
        handleDeleteItem,
        handleAddToCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
}
