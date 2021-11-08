import { useContext } from "react";
import CartContext from "../../store/cartContext";

import Modal from "../UI/modal";

import CartItem from "./cartItem";
import Checkout from "./Checkout";

import classes from "./cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItems = (
    <ul className={classes.cartItems}>
      {cartCtx.items.map((product) => (
        <CartItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price * product.qty}
          singlePrice={product.price}
          qty={product.qty}
        ></CartItem>
      ))}
    </ul>
  );

  const onOrderHandler = (name, city) => {
    cartCtx.resetHandler();
    props.onCloseModal();
    alert(`Order confirmed: \n${name}\n${city}`);
  };

  return (
    <section className={classes.cart}>
      <Modal onCloseModal={props.onCloseModal}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${cartCtx.totalPrice.toFixed(2)}</span>
        </div>
        {cartCtx.totalPrice > 0 && <Checkout onConfirm={onOrderHandler} />}
        <div className={classes.actions}>
          <button onClick={props.onCloseModal}>Close</button>
        </div>
      </Modal>
    </section>
  );
};

export default Cart;
