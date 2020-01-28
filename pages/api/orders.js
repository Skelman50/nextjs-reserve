import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: "desc" })
      .populate({
        path: "products.product",
        model: "Product"
      });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(401).json("invalid token");
  }
};
