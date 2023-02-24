import React from "react";

const cartContext = React.createContext({

  items: [],
  totalAmount: 0,
  controlItemAmount: () => {},

numberOfCartItems: 0
});

export default cartContext;
