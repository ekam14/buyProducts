import { useEffect, useState } from "react";

import Product from "./components/product/product";
import Header from "./components/header/header";
import SortSelect from "./components/UI/sortSelect";
import NewProduct from "./components/UI/newProduct";
import SingleProduct from "./components/product/singleProduct";

import CartContextProvider from "./store/cartContextProvider";

import { Route, Switch } from "react-router";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://buyproducts-92b3d-default-rtdb.firebaseio.com/products.json"
      );
      const data = await response.json();

      const prodData = [];

      for (let key in data) {
        prodData.push({ id: key, ...data[key] });
      }
      console.log(prodData);
      setProducts(prodData);
    };

    fetchProducts();
  }, []);

  const sortProducts = (type) => {
    if (type === "default") return;

    type = type.split("-");
    const sortValue = type[0],
      sortType = type[1];

    let updatedProducts = [...products];
    updatedProducts.sort((pro1, pro2) => {
      let el1, el2;

      if (sortValue === "title") {
        el1 = pro1["title"].toLowerCase();
        el2 = pro2["title"].toLowerCase();
      } else if (sortValue === "price") {
        el1 = +pro1["price"];
        el2 = +pro2["price"];
      }

      if (el1 < el2) return sortType === "desc" ? 1 : -1;
      if (el1 > el2) return sortType === "desc" ? -1 : 1;
      return 0;
    });

    setProducts(updatedProducts);
  };

  const addDataHandler = (newProductData) => {
    console.log(newProductData);

    setProducts((products) => {
      const updatedProducts = products.concat(newProductData);
      return updatedProducts;
    });
  };

  return (
    <CartContextProvider>
      <Header />
      <Switch>
        <Route path="/newProduct" exact>
          <NewProduct addData={addDataHandler} />
        </Route>
        <Route path="/" exact>
          <SortSelect sortProducts={sortProducts} />
          <main>
            <Product products={products}></Product>
          </main>
        </Route>
        <Route path="/singleProduct">
          <SingleProduct />
        </Route>
      </Switch>
    </CartContextProvider>
  );
}

export default App;
