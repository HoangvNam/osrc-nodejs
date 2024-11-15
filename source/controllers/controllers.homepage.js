

export class HomePageController {
    static async homepage(req, res) {
        res.render('homepage', { title: "Home Page" })
    }
}