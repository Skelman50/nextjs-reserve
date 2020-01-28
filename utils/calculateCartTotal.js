export function calculateTotal(products) {
  const total = products.reduce((total, element) => {
    return total + element.product.price * 100 * element.quantity;
  }, 0);
  const cartTotal = (total / 100).toFixed(2);
  const stripeTotal = Number(total.toFixed(2));
  return { cartTotal, stripeTotal };
}
