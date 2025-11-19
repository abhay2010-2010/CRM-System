
const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, 
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Sales'], // Role-Based Access Control
        default: 'Sales'
    },
    socketId: String 
});

const User=mongoose.model("User",UserSchema);

module.exports=User;