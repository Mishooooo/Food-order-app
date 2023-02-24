import { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import styles from "./Header.module.css";
import mealsImage from "./assets/meals.jpg";
// import AddMealsForm from "../Meals/MealsItem/AddMealForm";
import cartContext from "../../store/cart-context";

const Header = function (props) {
  const cartCtx = useContext(cartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  const { items } = cartCtx;



  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.numberOfCartItems]);

  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button className={btnClasses} onClick={props.onShowCart}>
          {/* <div className={styles['main-image']}> */}
          <span className={styles.icon}>
            <CartIcon />
          </span>
          Your Cart <span className={styles.badge}>{cartCtx.numberOfCartItems}</span>
        </button>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
