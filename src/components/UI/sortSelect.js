import classes from "./sortSelect.module.css";

import { Link } from "react-router-dom";

const SortSelect = (props) => {
  const onChangeHandler = () => {
    const sortBox = document.getElementById("sortBox");

    props.sortProducts(sortBox.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sortBox}>
        <div>
          <label>Sort By:</label>
        </div>
        <div>
          <select id="sortBox" name="sort" onChange={onChangeHandler}>
            <option value="def">Default</option>
            <option value="title-asc">Title Ascending</option>
            <option value="title-desc">Title Descending</option>
            <option value="price-asc">Price Ascending</option>
            <option value="price-desc">Price Descending</option>
          </select>
        </div>
      </div>
      <div className={classes.link}>
        <Link to="/newProduct">Add New Product?</Link>
      </div>
    </div>
  );
};

export default SortSelect;
