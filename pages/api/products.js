import connectDB from "../../utils/connectDb.js";
import Product from "../../models/Product.js";

connectDB();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const sizeNum = Number(size);
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / sizeNum);
  if (pageNum === 1) {
    const products = await Product.find().limit(sizeNum);
    return res.json({ products, totalPages });
  }
  const skips = sizeNum * (pageNum - 1);
  const products = await Product.find()
    .skip(skips)
    .limit(sizeNum);
  res.json({ products, totalPages });
};
