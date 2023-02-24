import React, { useState, useRef } from "react";

import styles from "./AddMealForm.module.css";

const AddMealsForm = function (props) {
  const enteredQuantity = useRef();

  const [amointIsValid, setAmointIsValid] = useState(true);

  const AddInCart = (e) => {
    e.preventDefault();

    if (
      enteredQuantity.current.value === null ||
      +enteredQuantity.current.value < 1 ||
      +enteredQuantity.current.value > 5
    ) {
      setAmointIsValid(false);
    } else setAmointIsValid(true);
    props.onAddCart({
      price: props.foodPrice,
      amount: enteredQuantity.current.value,
      id: props.id,
      description: props.foodDescription,
      name: props.foodName,
    });
  };

  return (
    <>
      <form onSubmit={AddInCart}>
        <label htmlFor="amount"> Amount </label>
        <input
          type="number"
          min="1"
          max="5"
          step="1"
          defaultValue="1"
          // value={enteredQuantity}
          ref={enteredQuantity}
        />
        {!amointIsValid && (
          <p className={styles.wrongAmount}>Enter valid amount! (1 to 5)</p>
        )}
        <div>
          <button>+ Add</button>
        </div>
      </form>
    </>
  );
};

export default AddMealsForm;
