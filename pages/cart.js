import axios from "axios";
import cookies from "js-cookie";
import { parseCookies } from "nookies";

import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { baseURL } from "../utils/baseUrl";

import { useState, useEffect } from "react";
import { calculateTotal } from "../utils/calculateCartTotal";
import { catchErrors } from "../utils/catchErrors";

function Cart({ products, user }) {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateTotal(cartProducts);
    setStripeAmount(stripeTotal);
    setCartAmount(cartTotal);
    setIsCartEmpty(!cartProducts.length);
  }, [cartProducts]);

  const handleRemoveProduct = async productId => {
    const url = `${baseURL}/cart`;
    const token = cookies.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  const handleCheckout = async paymentData => {
    try {
      setLoading(true);
      const url = `${baseURL}/checkout`;
      const token = cookies.get("token");
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment loading={loading}>
      <CartItemList
        user={user}
        products={cartProducts}
        handleRemoveProduct={handleRemoveProduct}
        success={success}
      />
      <CartSummary
        isCartEmpty={isCartEmpty}
        cartAmount={cartAmount}
        stripeAmount={stripeAmount}
        handleCheckout={handleCheckout}
        products={products}
        success={success}
      />
    </Segment>
  );
}

Cart.getInitialProps = async function(ctx) {
  const token = parseCookies(ctx);
  if (!token.token) {
    return { products: [] };
  }
  const payload = { headers: { Authorization: token.token } };
  const url = `${baseURL}/cart`;
  const response = await axios.get(url, payload);
  return { products: response.data };
};

export default Cart;
