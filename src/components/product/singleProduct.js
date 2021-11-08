import { useRef, useContext } from "react";

import classes from "./productItem.module.css";

import { useLocation } from "react-router";

import CartContext from "../../store/cartContext";

const SingleProduct = (props) => {
  const numRef = useRef();
  const loc = useLocation();
  const cartCtx = useContext(CartContext);

  let location = new URLSearchParams(loc.search);

  let id = location.get("id"),
    title = location.get("title"),
    price = location.get("price"),
    img = location.get("img");

  console.log(img);

  const buyHandler = () => {
    if (+numRef.current.value < 1) return;

    const item = {
      id,
      title,
      price,
      qty: +numRef.current.value,
    };

    numRef.current.value = 0;

    cartCtx.addItemHandler(item);
  };

  return (
    <div className={classes.productItem}>
      <div>
        <h2>{title}</h2>
      </div>
      <div className={classes.image}>
        <img src={img} alt="product"></img>
      </div>
      <div className={classes.price}>
        <span>${price}</span>
      </div>
      <div className={classes.amount}>
        <span>Amount</span>
        <input type="number" min="1" max="5" ref={numRef}></input>
      </div>
      <div className={classes.actions}>
        <button onClick={buyHandler}>+ Add</button>
      </div>
    </div>
  );
};

export default SingleProduct;
