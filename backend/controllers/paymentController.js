const Razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await Razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const { userId, courseId, paymentId, orderId, amount } = req.body;

    const payment = await Payment.create({
      user: userId,
      course: courseId,
      paymentId,
      orderId,
      amount,
      status: "success"
    });

    res.json({
      message: "Payment successful",
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};