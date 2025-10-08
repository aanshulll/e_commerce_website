const multer = require("multer");

// Use diskStorage just to hold the file temporarily
const storage = multer.diskStorage({});
const upload = multer({ storage });

module.exports = upload;
