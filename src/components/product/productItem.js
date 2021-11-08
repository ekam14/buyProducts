import { useRef } from "react";

import classes from "./productItem.module.css";

import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const numRef = useRef();

  const buyHandler = () => {
    if (+numRef.current.value < 1) return;

    const item = {
      id: props.id,
      title: props.title,
      price: props.price,
      qty: +numRef.current.value,
    };

    numRef.current.value = 0;

    props.addProduct(item);
  };

  const customUrl = `/singleProduct/search?&id=${props.id}&title=${
    props.title
  }&price=${props.price}&img=${encodeURIComponent(props.img)}`;

  return (
    <li className={classes.productItems}>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div className={classes.image}>
        <Link to={customUrl}>
          <img src={props.img} alt="product"></img>
        </Link>
      </div>
      <div className={classes.price}>
        <span>${props.price}</span>
      </div>
      <div className={classes.amount}>
        <span>Amount</span>
        <input type="number" min="1" max="5" ref={numRef}></input>
      </div>
      <div className={classes.actions}>
        <button onClick={buyHandler}>+ Add</button>
      </div>
    </li>
  );
};

export default ProductItem;
