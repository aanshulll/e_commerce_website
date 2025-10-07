const mongo = require("mongoose")


async function ConnectDB(url) {


    return await mongo.connect(url).then(()=> {
        try {
             console.log("DB IS CONNECTED")
        } catch (error) {

            console.log("DB is failed to connect", error);
            
            
        }
    });
    




    
}

module.exports = ConnectDB;

