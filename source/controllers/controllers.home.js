export class HomePageController {
    static showHomePage(req, res) {
        res.render("homepage", { title: "HomePage" })
    }
}