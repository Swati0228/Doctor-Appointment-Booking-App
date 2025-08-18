import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Database & Cloudinary connection
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
    connectCloudinary();
    console.log("✅ Cloudinary connected");
  } catch (error) {
    console.error("❌ Error in DB/Cloudinary connection:", error.message);
    process.exit(1);
  }
})();

// middlewares
app.use(express.json());
app.use(cors({
  origin: "*",   // You can restrict this later to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// root endpoint
app.get("/", (req, res) => {
  res.send("✅ API Working");
});

// start server
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
