import React, { useContext, useState } from "react";

import classes from "./cartButton.module.css";

import CartContext from "../../store/cartContext";

import Cart from "./cart";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [showModal, setModal] = useState(false);

  const showModalHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      {showModal && <Cart onCloseModal={closeModalHandler}></Cart>}
      <button className={classes.button} onClick={showModalHandler}>
        Your Cart
        <label className={classes.badge}>{cartCtx.totalQty}</label>
      </button>
    </React.Fragment>
  );
};

export default CartButton;
