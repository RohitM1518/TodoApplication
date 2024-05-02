import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller.js";
const router = Router()

router.route('/create').post(verifyJwt,createTodo)
router.route('/update/:todoid').patch(verifyJwt,updateTodo)
router.route('/delete/:todoid').delete(verifyJwt,deleteTodo)

export default router   
