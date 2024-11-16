import { BookingController } from "../controllers/controllers.booking.js";


export function routeBooking(app) {
    app.get("/add-booking", BookingController.showAddBooking)
    app.get("/bookings", BookingController.showBookings)
    app.get("/edit-booking/:id", BookingController.showEditBooking)


    app.post("/add-booking", BookingController.addBooking)
    app.post("/delete-booking/:id", BookingController.deleteBooking)
    app.post("/edit-booking/:id", BookingController.updateBooking)
    app.post("/cancel-booking/:id", BookingController.cancelBooking)
}