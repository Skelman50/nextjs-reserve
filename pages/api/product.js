import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDB from "../../utils/connectDb.js";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findById(_id);
  res.json({ product });
};

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  try {
    await Product.findByIdAndDelete(_id);
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong. Try again later!");
  }
};

const handlePostRequest = async (req, res) => {
  try {
    const { name, price, description, mediaUrl } = req.body;
    if (!name || !price || !description || !mediaUrl) {
      return res.status(400).json("Bad request");
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};
