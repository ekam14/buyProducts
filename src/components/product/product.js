import { useContext } from "react";

import ProductItem from "./productItem";

import classes from "./product.module.css";

import CartContext from "../../store/cartContext";

const Product = (props) => {
  const cartCtx = useContext(CartContext);

  const addProductHandler = (item) => {
    cartCtx.addItemHandler(item);
  };

  return (
    <section>
      <ul className={classes.products}>
        {props.products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            img={product.img}
            addProduct={addProductHandler}
          ></ProductItem>
        ))}
      </ul>
    </section>
  );
};

export default Product;
