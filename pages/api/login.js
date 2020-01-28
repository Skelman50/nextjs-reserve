import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json("User not fount");
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(401).json("Password not match");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Somethin went wrong");
  }
};
