import mongoose from "mongoose"


const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
}, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
})


const Booking = mongoose.model('Booking', bookingSchema)
export default Booking