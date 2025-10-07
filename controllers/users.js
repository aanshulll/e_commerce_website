const user = require("../models/users")

// User registration on the app
async function registerUser(req, res) {

    let data = req.body;
    console.log(data);
    
    // Check if req.body is defined
    if (!data) {
        return res.status(400).json({ Message: "Request body is missing" });
    }

    // Check if required properties are present
    if (!data.name || !data.email || !data.Address || !data.phoneNumber) {
        return res.status(400).json({ Message: "Missing required fields" });
    }
    
    const NewUser = await user.create(
        {
            username: data.name,
            email: data.email,
            password:data.password,
            deliveryAddress: data.Address,
            phoneNumber: data.phoneNumber


        }
    )

    console.log(NewUser);

    res.render("registrationDone")
    
    
}

//showing user profile from DB
async function Showprofile(req, res) {
    

    let userID = req.params.id;
    let userData = await user.findById(userID);
    

    let html =
    `
    ${userData.username}  <br>  ${userData.email}   <br> ${userData.deliveryAddress}  <br> ${userData.contactNo} 
    
    
    `

   res.send(html)
    
}
// showing all users
async function showAllUsers(req,res) {

    let Allusers = await user.find({})

    let html = 
    `
    ${Allusers.map((val)=>
    {
        return `
        <ol>
        <li>${val.username} <br> ${val.email} <br> ${val.deliveryAddress} <br> ${val.contactNo} </li>
        </ol> `
    })}
    `
    res.send(html)
}


async function registerUserPage(req,res) {

    res.render("register")
    
}
module.exports = 
{
    Showprofile,
    registerUser,
    showAllUsers,
    registerUserPage
}