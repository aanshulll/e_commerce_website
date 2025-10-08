const express = require("express")
const {AllItems} = require("../controllers/staticRoute");
const router = express.Router()
// dynamic route last
router.get("/", AllItems);


module.exports = router;
