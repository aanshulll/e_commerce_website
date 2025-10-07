const {getUser} = require("../util/auth")  


function checkAuth(req, res, next) {
    const sessionID = req.cookies.sessionID;
    if (!sessionID) {
        
        res.redirect("/login")
        
    }

    const user = getUser(sessionID);
    req.user = user;
    next();
}

module.exports = { checkAuth };
