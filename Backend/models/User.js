const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
/*//anjanth2552004
//qZfE9k3AxX7lKXY8*/
const userSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true 
        },
    email: {
         type: String, 
         required: true, 
         unique: true 
        },
    phone: {
         type: String, 
         required: true 
        },
    address: {
         type: String, 
         required: true 
        },
    password: {
         type: String, 
         required: true 
        },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
