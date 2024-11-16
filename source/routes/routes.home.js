import { HomePageController } from "../controllers/controllers.home.js";

export function routeHomePage(app) {
    app.get("/", HomePageController.showHomePage)
}