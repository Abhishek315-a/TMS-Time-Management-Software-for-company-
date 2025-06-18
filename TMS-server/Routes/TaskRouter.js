const {assignTask,getTasks,getManagerTasks,updateTask,deleteTask} = require("../Controllers/TasksController");
const router = require("express").Router();

router.post("/task",assignTask);
router.get("/task",getTasks);
router.get("/manager-tasks", getManagerTasks);
router.patch("/update",updateTask);
router.delete("/delete/:id", deleteTask);

module.exports =router;