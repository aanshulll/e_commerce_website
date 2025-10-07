const mongo = require("mongoose");


const User = new  mongo.Schema(
    {
        username:{
            type: String,
            required: true
        },
        email:
        {
            type:String,
            required: true,
            unique: true
        },
        password:
        {
type: String,
required: true
        },
        deliveryAddress:
        {
            type: String,
            required: true
        },
        phoneNumber:
        {
            type: Number,
            
        }

       
    },
{
    timestamps: true
}
    
 
)

const Newuser = mongo.model('user', User);

module.exports = Newuser;