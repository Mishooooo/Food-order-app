import styles from "./MealItem.module.css";
import AddMealForm from "./AddMealForm";
import cartContext from "../../../store/cart-context";
import { useContext } from "react";

const Meal = function (props) {
  const cartCtx = useContext(cartContext);


  const addToCart = function (items) {
    cartCtx.controlItemAmount(items);

  };

  return (
    <div className={styles.meal}>

      <div>
        <h3>{props.foodName}</h3>
        <span className={styles.description}>{props.foodDescription}</span>
        <div>
          <span className={styles.price}>${props.foodPrice}</span>
        </div>
      </div>

      <AddMealForm
        onAddCart={addToCart}
        id={props.id}
        foodPrice={props.foodPrice}
        foodDescription={props.foodDescription}
        foodName={props.foodName}
      />
    </div>
  );
};

export default Meal;
