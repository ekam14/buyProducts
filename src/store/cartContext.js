import React from "react";

const CartContext = React.createContext({
  items: [], // { id, qty, price }
  addItemHandler: (id, qty) => {},
  removeItemHandler: (id) => {},
  resetHandler: () => {},
  totalPrice: 0,
  totalQty: 0,
});

export default CartContext;
