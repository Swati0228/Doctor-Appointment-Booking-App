import mongoose from "mongoose";
import doctorModel from "./models/doctorModel.js";   // schema/model
import doctors from "./models/doctor.js";        // seed data array

// Replace with your actual MongoDB connection string
const MONGO_URI = "mongodb+srv://22bce112:swati123@cluster0.s2y0lwm.mongodb.net/docmanagement?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("MongoDB connected ✅");

  try {
    // Clear existing doctors
    await doctorModel.deleteMany({});
    console.log("Old doctors removed");

    // Insert new doctors
    await doctorModel.insertMany(doctors);
    console.log("Doctors inserted successfully 🚀");
  } catch (err) {
    console.error("Error inserting doctors:", err);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => console.error("DB connection error:", err));
