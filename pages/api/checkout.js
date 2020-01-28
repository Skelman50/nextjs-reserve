import Stripe from "stripe";
import uuid from "uuid/v4";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import { calculateTotal } from "../../utils/calculateCartTotal";
import Order from "../../models/Order";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    const { cartTotal, stripeTotal } = calculateTotal(cart.products);
    //get email from payment data, see if email linked with existing stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    //if not existing customer, create them based on their email
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    //create charge with total, send receipt email
    const charge = await stripe.charges.create(
      {
        currency: "usd",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`
      },
      {
        idempotency_key: uuid()
      }
    );
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products
    }).save();
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Somethin went wrong");
  }
};
