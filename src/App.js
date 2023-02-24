import CartProvider from "./store/CartProvider";
import Header from "./components/layout/Header";
import AboutMeals from "./components/Meals/AboutMeals";
import MealList from "./components/Meals/MealList";
import cartContext from "./store/cart-context";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

function App(props) {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = function () {
    setShowCart(true);
  };
  const hideCartHandler = function () {
    setShowCart(false);
  };

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      {showCart && <Cart onClose={hideCartHandler} />}
      <AboutMeals />
      <MealList />
    </CartProvider>
  );
}

export default App;


