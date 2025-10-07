const express = require("express")
const {Showprofile,registerUser,showAllUsers,registerUserPage}= require("../controllers/users")
const router = express.Router()



// Correct order
router.get("/register", registerUserPage);
router.post("/register", registerUser);

// router.get("/", showAllUsers);
router.get("/:id", Showprofile);


module.exports = router;
