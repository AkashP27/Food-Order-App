import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
 items: [],
 totalAmount: 0,
};

const cardReducer = (state, action) => {
 if (action.type === "ADD_CART_ITEM") {
  const updatedTotalAmount =
   state.totalAmount + action.payloadItem.price * action.payloadItem.amount;

  const existingCartItemIndex = state.items.findIndex(
   (item) => item.id === action.payloadItem.id
  );

  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItems;

  if (existingCartItem) {
   const updatedItem = {
    ...existingCartItem,
    amount: existingCartItem.amount + action.payloadItem.amount,
   };
   updatedItems = [...state.items];
   updatedItems[existingCartItemIndex] = updatedItem;
  } else {
   updatedItems = state.items.concat(action.payloadItem);
  }

  return {
   items: updatedItems,
   totalAmount: updatedTotalAmount,
  };
 }

 if (action.type === "REMOVE_CART_ITEM") {
  const existingCartItemIndex = state.items.findIndex(
   (item) => item.id === action.payloadId
  );

  const existingCartItem = state.items[existingCartItemIndex];
  const updatedTotalAmount = state.totalAmount - existingCartItem.price;

  let updatedItems;
  if(existingCartItem.amount === 1) {
    updatedItems = state.items.filter(item => item.id !== action.payloadId);
  } else {
      const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
  }
    return {
     items: updatedItems,
     totalAmount: updatedTotalAmount,
    };
 }

 return defaultCartState;
};

const CartProvider = (props) => {
 const [cartState, dispatchCartAction] = useReducer(
  cardReducer,
  defaultCartState
 );

 const addItemToCartHandler = (item) => {
  dispatchCartAction({ type: "ADD_CART_ITEM", payloadItem: item });
 };

 const removeItemFromCartHandler = (id) => {
  dispatchCartAction({ type: "REMOVE_CART_ITEM", payloadId: id });
 };

 const cartContext = {
  items: cartState.items,
  totalAmount: cartState.totalAmount,
  addItem: addItemToCartHandler,
  removeItem: removeItemFromCartHandler,
 };

 return (
  <CartContext.Provider value={cartContext}>
   {props.children}
  </CartContext.Provider>
 );
};

export default CartProvider;
