const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    // email: {
    //     type: String,
    //     unique: [true, "email already exists"],
    //     required: [true, "email is required"],
    //     match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"]
    // },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
