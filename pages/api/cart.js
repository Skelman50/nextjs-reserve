import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "../../utils/connectDb";
import Cart from "../../models/Cart";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetCart(req, res);
      break;
    case "PUT":
      await handlePutCart(req, res);
      break;
    case "DELETE":
      await handleDeletecart(req, res);
      break;
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};
const handleGetCart = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).json("Invalid token");
  }
};

const handleDeletecart = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No token");
  }
  try {
    const { productId } = req.query;
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product"
    });
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).json("Invalid token");
  }
};

const handlePutCart = async (req, res) => {
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId });
    const productExists = cart.products.some(doc =>
      mongoose.Types.ObjectId(productId).equals(doc.product)
    );
    if (productExists) {
      await Cart.findOneAndUpdate(
        {
          _id: cart._id,
          "products.product": productId
        },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } }
      );
    }
    res.json("Cart updated");
  } catch (error) {
    console.error(error);
    res.status(403).json("Invalid token");
  }
};
