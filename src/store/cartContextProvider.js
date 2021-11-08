import { useReducer } from "react";

import CartContext from "./cartContext";

const initState = {
  items: [], // { id, price, qty }
  totalPrice: 0,
  totalQty: 0,
};

// reducer fnc -> update
const cartReducer = (prevState, action) => {
  // ADD into items
  if (action.type === "ADD") {
    // existing item
    const index = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = prevState.items[index];
    let updatedItems;

    let updatedPrice =
      prevState.totalPrice + action.item.price * action.item.qty;
    let updatedQty = prevState.totalQty + action.item.qty;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        qty: existingItem.qty + action.item.qty,
      };

      updatedItems = [...prevState.items];

      updatedItems[index] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: updatedPrice,
      totalQty: updatedQty,
    };
  }

  // REMOVE items
  if (action.type === "REMOVE") {
    // existing item
    const index = prevState.items.findIndex((item) => item.id === action.id);

    const existingItem = prevState.items[index];
    let updatedItems;

    let updatedPrice = prevState.totalPrice - existingItem.price;
    let updatedQty = prevState.totalQty - 1;

    if (existingItem.qty === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      existingItem.qty -= 1;

      updatedItems = [...prevState.items];
      updatedItems[index] = existingItem;
    }

    return {
      items: updatedItems,
      totalPrice: updatedPrice,
      totalQty: updatedQty,
    };
  }

  return initState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchFnc] = useReducer(cartReducer, initState);

  const addItemHandler = (item) => {
    dispatchFnc({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchFnc({ type: "REMOVE", id: id });
  };

  const resetHandler = () => {
    dispatchFnc({ type: "RESET" });
  };

  const contextValue = {
    items: cartState.items, // { id, qty, price }
    addItemHandler: addItemHandler,
    removeItemHandler: removeItemHandler,
    resetHandler: resetHandler,
    totalPrice: cartState.totalPrice,
    totalQty: cartState.totalQty,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
