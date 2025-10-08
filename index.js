const express = require("express");
const app = express();
const ConnectDB = require("./connection");
const user = require("./routers/users");
const product = require("./routers/product");
const homeRoute = require("./routers/staticRoute");
const userAuth = require("./routers/userAuth");
const { checkAuth } = require("./middlewares/authCookie");
const checkout = require("./routers/checkout");
const userProfile = require("./routers/userProfile");
const cloudinary = require('cloudinary').v2
require("dotenv").config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
const path = require("path");

const PORT = 3000;

ConnectDB(process.env.MONGODB_URI);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const cookieParser = require("cookie-parser"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // No longer needed with Cloudinary

// Public routes (no auth required)
app.use("/", userAuth); // contains /login and /logout
app.use("/", homeRoute); // any static pages

// Protected routes
app.use("/user", user);
app.use("/products", checkAuth, product);
app.use("/checkout", checkAuth, checkout);
app.use("/profile", checkAuth, userProfile);

app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
});
