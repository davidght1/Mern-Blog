import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
const app = express();
dotenv.config();

//Constats
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

//Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "All is fine2" });
});

//Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//mongoose connect and server up
async function start() {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.otffmeq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
