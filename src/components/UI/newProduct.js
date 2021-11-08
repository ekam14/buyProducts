import { useRef } from "react";

import { useHistory } from "react-router";

import classes from "./newProduct.module.css";

const NewProduct = (props) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      id: Math.random().toString(),
      title: titleRef.current.value,
      price: priceRef.current.value,
      img: imgRef.current.value,
    };

    const addProductData = async (data) => {
      await fetch(process.env.REACT_APP_DB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    addProductData(data);
    props.addData(data);
    history.replace("/");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" ref={priceRef} />
      </div>
      <div>
        <label htmlFor="img">Img Src</label>
        <input type="text" id="img" ref={imgRef} />
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default NewProduct;
