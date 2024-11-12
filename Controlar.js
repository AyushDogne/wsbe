const Ukti = require('./modul')
let {ObjectId} = require("mongodb")




const addUser = async (ukti)=>
    {
        const new_user = new Ukti(ukti)
        new_user.save()
        return new_user
    }


const getUserData = async (ukti)=>
    {
        return Ukti.find()
    }

    const updateData = async (id,ukti) => 
    {
        return Ukti.findById(new ObjectId(id),ukti)
    }
    
    const deleteData = async (id)=>
    {
        return Ukti.findOneAndDelete(new ObjectId(id))
    }

    
 module.exports = {addUser,getUserData,updateData,deleteData}