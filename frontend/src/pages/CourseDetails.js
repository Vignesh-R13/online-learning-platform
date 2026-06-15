import "../styles/CourseDetails.css";
import {
  createOrder,
  verifyPayment,
  getCourseById,
} from "../services/authService";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const fetchCourse = useCallback(async () => {
    try {
      const data = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCourse();
  }, [fetchCourse, id]);

  const handleBuyCourse = async () => {
    try {
      if (!course) return;

      const order = await createOrder(course.price);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: "rzp_test_SxV0wEfSpQenRU",
        amount: order.amount,
        currency: order.currency,
        name: "LearnHub",
        description: course.title,
        order_id: order.id,

        handler: async function (response) {
          const paymentData = {
            userId: user?.id,
            courseId: course._id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: course.price,
          };

          try {
            const result = await verifyPayment(paymentData);
            console.log(result);
            alert("🎉 Payment Successful!");
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#0f9d58",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  if (!course) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="course-details">
      <h1>{course.title}</h1>

      <img
        src="https://picsum.photos/900/300"
        alt={course.title}
      />

      <p>{course.description}</p>

      <p>
        <strong>Instructor:</strong> {course.instructor?.name}
      </p>

      <p>
        <strong>Price:</strong> ₹{course.price}</p>

      <button
        onClick={handleBuyCourse}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buy Course 💰
      </button>
    </div>
  );
}

export default CourseDetails;