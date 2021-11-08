import classes from "./cartItem.module.css";

import { useContext } from "react";
import CartContext from "../../store/cartContext";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const buyHandler = () => {
    const item = {
      id: props.id,
      title: props.title,
      price: props.singlePrice,
      qty: 1,
    };

    cartCtx.addItemHandler(item);
  };

  const removeHandler = () => {
    cartCtx.removeItemHandler(props.id);
  };

  return (
    <li className={classes.cartItems}>
      <div>
        <h2>{props.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>$ {props.price}</span>
          <span className={classes.amount}>X {props.qty}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeHandler}>-</button>
        <button onClick={buyHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
