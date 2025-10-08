const users = require("../models/users");
const { setUser } = require("../util/auth");
const products = require("../models/product");

async function handlerLogin(req, res) {
    const { email, password } = req.body;

    const userData = await users.findOne({ email, password });

    if (userData) {
        const sessionID = setUser(userData.email, userData.password);

        // Set cookie with consistent options
        res.cookie("sessionID", sessionID, { httpOnly: true, path: "/" });

        const allProducts = await products.find();
        res.render("home", { products: allProducts });
    } else {
        res.render("invalidCredentials");
    }
}

module.exports = { handlerLogin };
