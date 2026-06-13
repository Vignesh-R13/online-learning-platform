const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },

    paymentId: String,
    orderId: String,
    amount: Number,

    status: {
      type: String,
      default: "success"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", paymentSchema);