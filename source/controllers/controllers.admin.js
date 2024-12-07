import Admin from "../models/models.admin.js";
import User from "../models/models.user.js";
import bcrypt from "bcrypt"


export class AdminController {
    static showAdminPage(req, res) {
        res.render("admin-page", { title: "Admin Page"})
    }

    // -----------------------------------------------------------------------------

    static showRegisterAdmin(req, res) {
        res.render("admin-register", { title: "Admin Registration"})
    }

    static async registerAdmin(req, res) {
        try {
            const { username, password } = req.body;

            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin) {
                return res.status(400).send("Admin with this email already exists.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({
                username,
                password: hashedPassword,
            });

            await newAdmin.save();
            res.redirect("/admin/login");
        } catch (error) {
            res.status(500).send("Error registering admin: " + error.message);
        }
    }

    static showLoginAdmin(req, res) {
        res.render("admin-login", { title: "Admin Login" })
    }

    static async loginAdmin(req, res) {
        try {
            const { username, password } = req.body;

            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).send("Invalid email or password.");
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(400).send("Invalid email or password.");
            }

            req.session.adminId = admin._id;
            res.redirect("/admin/dashboard");
        } catch (error) {
            res.status(500).send("Error logging in admin: " + error.message);
        }
    }

    static async showAdmins(req, res) {
        try {
            const admins = await Admin.find().lean(); // Lấy danh sách tất cả admin
            res.render("admins", { title: "Admin List", admins });
        } catch (error) {
            res.status(500).send("Error fetching admins: " + error.message);
        }
    }

    static async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            if (req.session.adminId === id) {
                return res.status(400).send("You cannot delete yourself.");
            }
    
            await Admin.findByIdAndDelete(id);
            res.redirect("/admins");
        } catch (error) {
            res.status(500).send("Error deleting admin: " + error.message);
        }
    }
}


export function ensureAdmin(req, res, next) {
    if (req.session.adminId) {
        Admin.findById(req.session.adminId)
            .then((admin) => {
                if (admin) {
                    req.admin = admin;
                    next();
                } else {
                    res.status(403).send("Access denied.");
                }
            })
            .catch((error) => res.status(500).send("Error verifying admin: " + error.message));
    } else {
        res.redirect("/admin/login");
    }
}