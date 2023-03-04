import { useContext, useState } from "react";

import Modal from "../UI/Modal.js";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import Checkout from "./Checkout/Checkout.js";
import SpinnerIcon from "../UI/SpinnerIcon.js";

const Cart = (props) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSendingReq, setIsSendingReq] = useState(false);

  const cartCtx = useContext(cartContext);
  const hasItems = cartCtx.items.length > 0;

  const addInCart = function (item, amount) {
    cartCtx.controlItemAmount({ ...item, amount: amount });
  };

  const orderProducts = function () {
    setShowOrderForm(true);
  };

  const confirmSubmitHandler = async function (userData) {
    setIsSendingReq(true);
    try {
      const sendData = await fetch(
        "https://react-project-3d5fc-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!sendData.ok) {
        throw new Error("ERROR occured, unable to order meals");
      }
    

      setDidSubmit("Successfully sent the order!");
    } catch (err) {
      setDidSubmit(err.message);
    }
    setIsSendingReq(false);
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

  if (didSubmit) {
    return (
      <Modal>
        <h3>{didSubmit}</h3>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  if (showOrderForm) {
    if (isSendingReq) {
      return (
        <Modal>
          <div className={classes["data-sending"]}>
            <p>Sending data</p>
            <SpinnerIcon />
          </div>
        </Modal>
      );
    }
    return (
      <Modal>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>
        <Checkout onCancel={props.onClose} onConfirm={confirmSubmitHandler} />
      </Modal>
    );
  }

  return (
    <Modal>
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
          <button className={classes.button} onClick={orderProducts}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
