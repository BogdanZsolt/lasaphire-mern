export const addDecimals = (num, dec = 2) => {
  return (Math.round(num * 100) / 100).toFixed(dec);
};

export const isToBeDelivered = (items) => {
  let isToBeDelivered = false;
  items.map((item) => {
    if (item.toBeDelivered) {
      isToBeDelivered = true;
    }
  });
  return isToBeDelivered;
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.currentPrice * item.qty,
      0
    ),
    2
  );
  // Calculate Hungarian items price
  state.itemsPrice_hu = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.currentPrice_hu * 0.7874 * item.qty,
      0
    ),
    0
  );
  // Sets whether there is anything in the cart that needs to be delivered
  state.hasToBeDelivered = isToBeDelivered(state.cartItems);
  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(
    state.hasToBeDelivered
      ? state.itemsPrice > state.shippingPriceData?.shippingFreeFrom
        ? 0
        : state.shippingPriceData?.shippingPrice
      : 0,
    2
  );
  state.shippingPrice_hu = addDecimals(
    state.hasToBeDelivered
      ? state.itemsPrice_hu > state.shippingPriceData?.shippingFreeFromHu
        ? 0
        : state.shippingPriceData?.shippingPriceHu
      : 0,
    0
  );

  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  state.taxPrice_hu = addDecimals(Number(0.27 * state.itemsPrice_hu), 0);

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  state.totalPrice_hu = (
    Number(state.itemsPrice_hu) +
    Number(state.shippingPrice_hu) +
    Number(state.taxPrice_hu)
  ).toFixed(0);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
