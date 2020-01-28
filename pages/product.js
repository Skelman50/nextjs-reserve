import axios from "axios";
import cookies from "js-cookie";
import { Fragment, useState, useEffect } from "react";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
import { baseURL } from "../utils/baseUrl";
import { catchErrors } from "../utils/catchErrors";

function Product({ product, user }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);
  const handleChangeQuantity = e => {
    setQuantity(Number(e.target.value));
  };

  const handleAddProductToCart = async () => {
    try {
      setLoading(true);
      const url = `${baseURL}/cart`;
      const payload = { quantity, productId: product._id };
      const token = cookies.get("token");
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <ProductSummary
        {...product}
        quantity={quantity}
        handleChangeQuantity={handleChangeQuantity}
        user={user}
        handleAddProductToCart={handleAddProductToCart}
        success={success}
        loading={loading}
      />
      <ProductAttributes {...product} user={user} />
    </Fragment>
  );
}

Product.getInitialProps = async function({ query: { _id } }) {
  const url = `${baseURL}/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Product;
