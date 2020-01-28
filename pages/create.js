import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import CreateForm from "../components/Create/CreateForm";
import CreateHeader from "../components/Create/CreateHeader";
import { catchErrors } from "../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isproduct = Object.values(product).every(el => Boolean(el));
    isproduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setProduct(prevProduct => ({ ...prevProduct, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const mediaUrl = await handleImageUpload();
      const url = `${baseURL}/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
      console.error("ERROR!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "reactreserve");
    data.append("cloud_name", "vasia");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  return (
    <Fragment>
      <CreateHeader />
      <CreateForm
        product={product}
        mediaPreview={mediaPreview}
        success={success}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        disabled={disabled}
        error={error}
      />
    </Fragment>
  );
}

export default CreateProduct;
