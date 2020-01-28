import { Fragment } from "react";
import { Divider, Segment, Button } from "semantic-ui-react";
import StripeCheckout from "react-stripe-checkout";

function CartSummary({
  isCartEmpty,
  cartAmount,
  stripeAmount,
  handleCheckout,
  products,
  success
}) {
  return (
    <Fragment>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name="Next.js reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey="pk_test_Tedf3WWctPhwvG4hx7m2KGGY00l8qne5Fl"
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </Fragment>
  );
}

export default CartSummary;
