const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/*
=========================
MIDDLEWARES
=========================
*/

// ✅ FINAL CORS CONFIG (PRODUCTION READY)
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://online-learning-platform-amber.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow tools like Postman or server-to-server
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/*
=========================
ROUTES
=========================
*/

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payment", paymentRoutes);

/*
=========================
TEST ROUTE
=========================
*/

app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

/*
=========================
SERVER START
=========================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});