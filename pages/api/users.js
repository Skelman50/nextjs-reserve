import jwt from "jsonwebtoken";

import User from "../../models/User";

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const users = await User.find({ _id: { $ne: userId } }).sort({
      name: "asc"
    });
    res.json(users);
  } catch (error) {
    res.status(401).json("Please login");
  }
};
