import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length >= 6
            },
            message: "Username must be at least 6 characters long."
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length >= 8;
            },
            message: "Password must be at least 8 characters long.",
        },
    },
})

const Admin = mongoose.model('AdminPractice_01', AdminSchema)
export default Admin