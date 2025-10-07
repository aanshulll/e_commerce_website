const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads') // save into existing uploads folder at project root
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // specify the file naming convention
    }
  })

 const upload = multer({ storage: storage })

 module.exports = upload;