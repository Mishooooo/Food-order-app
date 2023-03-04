import classes from "./Checkout.module.css";
import cartContext from "../../../store/cart-context";
import { useState, useRef, useContext } from "react";

const isValidTextInput = (textInput) => textInput.trim().length >= 2;
const isValidNumbInput = (numbInput) => numbInput.trim().length === 4;



const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const cartCtx = useContext(cartContext);

  
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = isValidTextInput(enteredName);
    const enteredStreetIsValid = isValidTextInput(enteredStreet);
    const enteredPostalCodeIsValid = isValidNumbInput(enteredPostalCode);
    const enteredCityIsValid = isValidTextInput(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
    cartCtx.clearCartHandler();
  };

  const ControlClasses = (controlName) => {
   return  controlName
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
  }


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={ControlClasses(formInputsValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={ControlClasses(formInputsValidity.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={ControlClasses(formInputsValidity.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input type="number" id="postal" ref={postalCodeInput} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (4 characters long)!</p>
        )}
      </div>
      <div className={ControlClasses(formInputsValidity.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
