import Task from "../models/models.Task.js";


export class TaskController {
    static showAddTask(req, res) {
        res.render('add-task', { title: "Add Task" })
    }

    static async addTask(req, res) {
        try {
            const { title, description, status, dueDate, score } = req.body
            const newTask = new Task({ title, description, status, dueDate, score })
            await newTask.save()
            res.redirect('/add-task')
            console.log('Added task successfully')
        } catch (error) {
            res.status(500).send("Error adding task: " + error.message)
        }
    }

    static async showTasks(req, res) {
        try {
            const tasks = await Task.find().lean()
            res.render("tasks", { title: "Task", tasks })
        } catch (error) {
            res.status(500).send("Error fetching tasks: " + error.message)
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params
            console.log(req.params)
            await Task.findByIdAndDelete(id)
            res.redirect("/tasks")
        } catch (error) {
            res.status(500).send("Error deleting task: " + error.message);
        }
    }

    static async showEditTask(req, res) {
        try {
            const { id } = req.params
            const task = await Task.findById(id).lean()
            if (!task) {
                return res.status(404).send("Task not found")
            }
            res.render("edit-task", { title: "Edit Task", task })
        } catch (error) {
            res.status(500).send("Error fetching task: " + error.message)
        }
    }

    static async updateTask(req, res) {
        try {
            const { id } = req.params
            const { title, description, status, dueDate, score } = req.body
            await Task.findByIdAndUpdate(id, { title, description, status, dueDate, score })
            res.redirect("/tasks")
            console.log("Task updated successfully")
        } catch (error) {
            res.status(500).send("Error updating task: " + error.message)
        }
    }
}