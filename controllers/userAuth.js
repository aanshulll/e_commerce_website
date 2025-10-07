const users = require("../models/users")
const { setUser } = require("../util/auth")
const products = require("../models/product")



async function handlerLogin(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    let userData = await users.findOne({ email: email, password: password });
    console.log(userData);

    if (userData) {
        const sessionID = setUser(userData.email, userData.password)
        res.cookie("sessionID", sessionID, { httpOnly: true });
        const allProducts = await products.find();
        res.render("home", { products: allProducts });
    }
    else {
        res.render("invalidCredentials")
    }


}

module.exports = { handlerLogin };