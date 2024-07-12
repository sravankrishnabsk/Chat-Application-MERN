const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("CONNECTED TO MongoDB Server");
        })

        connection.on('error',()=>{
            console.log("SOMETHING IS WRONG WITH MongoDB Server");
        })
    } catch (error) {
        console.log("Something Went Wrong : ",error);
    }
}

module.exports = connectDB;