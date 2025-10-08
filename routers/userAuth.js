const express = require("express");
const { handlerLogin } = require("../controllers/userAuth");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login form submission
router.post("/login", handlerLogin);

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie("sessionID", { httpOnly: true, path: "/" });
    res.redirect("/login");
});

module.exports = router;
