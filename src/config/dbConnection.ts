import mongoose from "mongoose"
import "dotenv/config"

const connectionString = `${process.env.DB_URI}${process.env.DB_NAME}` || ""

const dbConnection = async ()=> {
    try {
        await mongoose.connect(connectionString)
    } catch (error) {
        console.log(error)
    }
}


export default dbConnection;