const express = require("express")
const {handlerLogin}= require("../controllers/userAuth")
const router = express.Router()
// Login route
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", handlerLogin);

module.exports = router;