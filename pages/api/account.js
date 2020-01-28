import jwt from "jsonwebtoken";
import connectDB from "../../utils/connectDb";
import User from "../../models/User";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetAccount(req, res);
      break;
    case "PUT":
      await handlePutAccount(req, res);
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
};

const handleGetAccount = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    res.status(403).json("Invalid token");
  }
};

const handlePutAccount = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findById(userId);
    if (user.role !== "root") {
      return res.status(403).json("No permissions");
    }
    const { _id, role } = req.body;
    await User.findOneAndUpdate({ _id }, { role });
    res.json("User updated");
  } catch (error) {
    res.status(403).json("Invalid token");
  }
};
