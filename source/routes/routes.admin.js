import { AdminController, ensureAdmin } from "../controllers/controllers.admin.js";


export function routeAdmin(app) {
    app.get("/admin/dashboard", ensureAdmin, AdminController.showAdminPage)
    app.get("/admin/register", AdminController.showRegisterAdmin)
    app.get("/admin/login", AdminController.showLoginAdmin)
    app.get("/delete-admin/:id", ensureAdmin, AdminController.deleteAdmin)
    app.get("/admins", ensureAdmin, AdminController.showAdmins)

    app.post("/admin/register", AdminController.registerAdmin)
    app.post("/admin/login", AdminController.loginAdmin)

    // -----------------------------------------------------------------------------

    // -----------------------------------------------------------------------------
}