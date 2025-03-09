function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(
  orderItems,
  taxRate = 0.15,
  freeShipping = 100,
  shipping = 10,
  hasToBeDelivered = false,
  fixed = 2
) {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  let shippingPrice = 0;
  if (hasToBeDelivered) {
    // Calculate the shipping price
    shippingPrice = addDecimals(itemsPrice > freeShipping ? 0 : shipping);
  }
  // Calculate the tax price
  const taxPrice = addDecimals(Number((taxRate * itemsPrice).toFixed(fixed)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}
