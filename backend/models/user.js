import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, trim: true},
        email: {type: String, required: true, lowercase: true, trim: true, unique: true},
        gender: {type: String, enum: ["male", "female", "other"], required: true},
        password: {type: String, required: true},
        profilePicture: {type: String, default: ""}
    },
    {timestamps: true}
)

export default mongoose.model("User", userSchema)