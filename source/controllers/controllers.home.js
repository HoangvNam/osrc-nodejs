export class HomePageController {
    static showHomePage(req, res) {
        res.render("add-booking", { title: "HomePage" })
    }
}