import { title } from "process";
import Booking from "../models/models.booking.js";


export class BookingController {
    static showAddBooking(req, res) {
        res.render('add-booking', { title: "Add Booking" });
    }

    static async addBooking(req, res) {
        try {
            const { customerName, date, time, status } = req.body;
            const newBooking = new Booking({ customerName, date, time, status });
            await newBooking.save();
            res.redirect('/add-booking');
            console.log('Added booking successfully');
        } catch (error) {
            res.status(500).send("Error adding booking: " + error.message);
        }
    }

    static async showBookings(req, res) {
        try {
            const bookings = await Booking.find().lean();
            res.render("bookings", { title: "Bookings", bookings });
        } catch (error) {
            res.status(500).send("Error fetching bookings: " + error.message);
        }
    }

    static async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            console.log(req.params);
            await Booking.findByIdAndDelete(id);
            res.redirect("/bookings");
        } catch (error) {
            res.status(500).send("Error deleting booking: " + error.message);
        }
    }

    static async showEditBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await Booking.findById(id).lean();
            if (!booking) {
                return res.status(404).send("Booking not found");
            }
            res.render("edit-booking", { title: "Edit Booking", booking });
        } catch (error) {
            res.status(500).send("Error fetching booking: " + error.message);
        }
    }

    static async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const { customerName, date, time, status } = req.body;
            await Booking.findByIdAndUpdate(id, { customerName, date, time, status });
            res.redirect("/bookings");
            console.log("Booking updated successfully");
        } catch (error) {
            res.status(500).send("Error updating booking: " + error.message);
        }
    }

    static async cancelBooking(req, res) {
        try {
            const { id } = req.params;

            const updatedBooking = await Booking.findByIdAndUpdate(
                id, 
                { status: "Cancelled" },
                { new: true }
            )

            // Nếu không tìm thấy booking
            if (!updatedBooking) {
                return res.status(404).send("Booking not found");
            }

            // Chuyển hướng về danh sách booking sau khi cập nhật
            res.redirect("/bookings");
            console.log("Booking has been cancelled");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error cancelling booking: " + error.message);
        }
    }
}
