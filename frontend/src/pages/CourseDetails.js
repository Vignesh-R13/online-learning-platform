import "../styles/CourseDetails.css";
import { createOrder, verifyPayment, getCourseById } from "../services/authService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  console.log("Current route param:", id);

  const [course, setCourse] = useState(null);
  
  const fetchCourse = async () => {
    try {
      console.log("ID from URL:", id);

      const data = await getCourseById(id);

      console.log("Data received:", data);

      setCourse(data);
    } catch (error) {
       console.error("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleBuyCourse = async () => {
    try {
      const order = await createOrder(course.price);

      const user = JSON.parse(localStorage.getItem("user"));

      const options = {
        key: "rzp_test_SxV0wEfSpQenRU",
        amount: order.amount,
        currency: order.currency,
        name: "LearnHub",
        description: course.title,
        order_id: order.id,

        handler: async function (response) {
          const paymentData = {
            userId: user.id,
            courseId: course._id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: course.price
          };

          const result = await verifyPayment(paymentData);

          alert("🎉 Payment Successful!");
          console.log(result);
        },

        prefill: {
          name: user?.name,
          email: user?.email
        },

        theme: {
          color: "#0f9d58"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
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
        <strong>Instructor:</strong>{" "}
        {course.instructor?.name}
      </p>

      <p>
        <strong>Price:</strong> ₹{course.price}
      </p>

      <button
        onClick={handleBuyCourse}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Buy Course 💰
      </button>

    </div>
  );
}

export default CourseDetails;