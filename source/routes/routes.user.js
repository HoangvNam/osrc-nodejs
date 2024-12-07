import { UserController } from "../controllers/controllers.user.js";


export function routeUser(app) {
    app.post("/register", UserController.signup)
    app.post("/login", UserController.login)
}