const jwt = require("jsonwebtoken")
const secret = "pixelGyaan@321"


function setUser(email, password) {
   // Sign and return a JWT so caller can set it in the cookie
   return jwt.sign(
    {
        email: email,
        password: password
    },
    secret,
    { expiresIn: "1h" }
   )
}

function getUser(token) {
    // Verify with the same secret; throw if invalid
    return jwt.verify(token, secret)
}   
module.exports = { setUser, getUser };