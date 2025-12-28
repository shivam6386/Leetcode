 const mongoose = require("mongoose");
 async function connectDb(){
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Data base connected');
    } catch (error) {
        console.log("Failed to DB Connection");
        console.log("Error",error);
    }
}

module.exports=connectDb;