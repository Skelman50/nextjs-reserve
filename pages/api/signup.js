import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import User from "../../models/User";
import connectDB from "../../utils/connectDb.js";
import Cart from "../../models/Cart";

connectDB();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).json("Name must have 3-10 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .json("Password must be at least 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).json("Email must be a valid");
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(422).json(`User already exist with email ${email}`);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({
      name,
      email,
      password: hash
    }).save();
    await new Cart({ user: user._id }).save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json("Somethin went wrong");
  }
};
