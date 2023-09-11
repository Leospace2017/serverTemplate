import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {type: String, max: 20},
    email: {type: String, includes: "@", require: true},
    password: {type: String, require: true},
    note:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
    }]

})


const User =  mongoose.model("User", userSchema, "UserModel")

export default User