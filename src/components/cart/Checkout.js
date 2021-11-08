import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    city: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm(enteredName, enteredCity);
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} autoComplete="off" />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} autoComplete="off" />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
