import { useContext, useReducer, useState } from "react";

import cartContext from "./cart-context";

const defaultState = { items: [], totalAmount: 0 };

const amountReducer = function (state, action) {
  const totalAmount = state.totalAmount + action.val.price * action.val.amount;

  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.val.id
  );

  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItems;

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + +action.val.amount,
    };

    updatedItems = state.items;
    updatedItems[existingCartItemIndex] = updatedItem;

    if (updatedItems.find((item) => item.amount === 0)) {
      updatedItems.splice(existingCartItemIndex, 1);
    }
  } else {
    updatedItems = state.items.concat({
      id: action.val.id,
      name: action.val.name,
      amount: +action.val.amount,
      price: action.val.price,
    });
  }

  return {
    items: updatedItems,

    totalAmount: totalAmount,
  };
};

const CartProvider = function (props) {
  const addedAmount = useContext(cartContext);

  const [cartState, dispatchAmount] = useReducer(amountReducer, defaultState);

  const amountHandler = function (items) {
    dispatchAmount({ type: "ADD", val: items });
  };

  const numberOfCartItems = cartState.items.reduce((curNumber, item) => {
    return curNumber + +item.amount;
  }, 0);

  const contextdefaultState = {
    totalAmount: cartState.totalAmount,
    items: cartState.items,
    controlItemAmount: amountHandler,
    numberOfCartItems: numberOfCartItems,
  };

  return (
    <cartContext.Provider value={contextdefaultState}>
      {props.children}
    </cartContext.Provider>
  );
};
export default CartProvider;
