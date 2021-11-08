import classes from "./header.module.css";

import CartButton from "../cart/cartButton";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <label className={classes.text}>Buy Products</label>
      </Link>
      <CartButton></CartButton>
    </header>
  );
};

export default Header;
