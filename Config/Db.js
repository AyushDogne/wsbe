const dotenv = require("dotenv")
const { default: mongoose, connection } = require("mongoose")
 dotenv.config()

 const MONGODB_URL = process.env.MONGODB_URL


 const db = async ()=>
    {
        try
        {
            const con = await mongoose.connect(MONGODB_URL)
            console.log("mongoconnection",con.connection.host);
            
        }
        catch(error)
        {
            console.log(error);
        }
    } 

    module.exports = db