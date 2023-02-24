import { useContext } from "react";

import Modal from "../UI/Modal.js";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(cartContext);
  const hasItems = cartCtx.items.length > 0;
  const addInCart = function (item, amount) {
    cartCtx.controlItemAmount({ ...item, amount: amount });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            foodPrice={item.price}
            amount={item.amount}
            foodName={item.name}
            onAdd={addInCart.bind(null, item, 1)}
            onRemove={addInCart.bind(null, item, -1)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onClose}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
