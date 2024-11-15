import { TaskController } from "../controllers/controllers.task.js";


export function routeTask(app) {
    app.get("/add-task", TaskController.showAddTask)
    app.get("/tasks", TaskController.showTasks)
    app.get("/edit-task/:id", TaskController.showEditTask)
    
    app.post("/add-task", TaskController.addTask)
    app.post("/delete-task/:id", TaskController.deleteTask)
    app.post("/edit-task/:id", TaskController.updateTask)
}