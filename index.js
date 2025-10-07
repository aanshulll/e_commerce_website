const express = require("express")
const app = express();
const ConnectDB = require("./connection")
const user = require("./routers/users")
const product = require("./routers/product")
const userAuth = require("./routers/userAuth")
const { checkAuth } = require("./middlewares/authCookie");
const checkout= require("./routers/checkout")
require("dotenv").config()
const path = require("path");
const PORT = 3000
// pswd = akZ9iIbKmyF1WkQh@buykaro.63mouzf.mongodb.net/?retryWrites=true&w=majority&appName=buykaro
ConnectDB(process.env.MONGODB_URI)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const cookieParser = require("cookie-parser"); 
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Add this line
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Public auth routes (e.g., /login) must be accessible without auth
app.use("/", userAuth)
// Protect the rest
app.use("/user",user)
app.use("/", checkAuth, product)
app.use("/checkout",checkout)

app.listen(PORT, ()=>

{
    console.log("Server is On at port no:", PORT);
    
})





