import axios from "axios";

// =========================
// BASE API INSTANCE (IMPORTANT)
// =========================
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// =========================
// ATTACH TOKEN AUTOMATICALLY
// =========================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  console.log("🔥 INTERCEPTOR RUNNING");
  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// AUTH APIs
// =========================
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  // save login data
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

// =========================
// COURSE APIs
// =========================
export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

// =========================
// ENROLL COURSE
// =========================
export const enrollCourse = async (courseId) => {
  const response = await api.post(`/courses/${courseId}/enroll`);
  return response.data;
};

// =========================
// MY COURSES
// =========================
export const getMyCourses = async (userId) => {
  const response = await api.get(`/courses/my/${userId}`);
  return response.data;
};

// =========================
// 💰 PAYMENT APIs (ADD HERE 👇)
// =========================

export const createOrder = async (amount) => {
  const res = await api.post("/payment/create-order", { amount });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payment/verify", data);
  return res.data;
};

// =========================
// INSTRUCTOR APIs
// =========================

export const getInstructorCourses = async () => {
  const res = await api.get("/courses/my-courses");
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await api.put(`/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};