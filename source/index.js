import express from "express"
import { engine } from "express-handlebars"
import path from "path"
import morgan from "morgan"
import fs from "fs"
import { fileURLToPath } from "url"
import { configDotenv } from "dotenv"
import mongoose from "mongoose"
import { routeHomePage } from "./routes/routes.homepage.js"
import { routeTask } from "./routes/routes.task.js"


// ----------------------------------------------------------------------------


class HP {
    static __filename = fileURLToPath(import.meta.url)
    static __dirname = path.dirname(this.__filename)
    static PORT = process.env.PORT || 3000
}


// ----------------------------------------------------------------------------


// Configure mongodb
configDotenv({path: path.join(HP.__dirname, ".env")})
const MONGODB_URI = process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI, {serverSelectionTimeoutMS: 30000})
    .then(() => console.log("You successfully connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection error: ", err))


// ----------------------------------------------------------------------------


// Configure application
const app = express()


// ----------------------------------------------------------------------------


// Configure handlebars
app.engine("hbs", engine({
    extname: "hbs",
    helpers: {
        formatDate: (date) => {
            if (!date) return ""
            return new Date(date).toLocaleDateString('vi-VN')
        },
        eq: (a, b) => a === b,
    }
}))

app.set("view engine", "hbs")
app.set("views", path.join(HP.__dirname, "views"))


// ----------------------------------------------------------------------------


// Configure static files
app.use(express.static(path.join(HP.__dirname, "public")))


// ----------------------------------------------------------------------------


// More configre
app.use(morgan("combined"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// ----------------------------------------------------------------------------


// Configure routes
routeHomePage(app)
routeTask(app)


// ----------------------------------------------------------------------------


// Run application
app.listen(HP.PORT, () => {console.log(`The server is running at http://localhost:${HP.PORT}`)})


// ----------------------------------------------------------------------------