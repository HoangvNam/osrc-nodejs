import { HomePageController } from "../controllers/controllers.homepage.js";


export function routeHomePage(app) {
    app.get("/", HomePageController.homepage)
    app.get("/homepage", HomePageController.homepage)
}