import {Router} from 'express'
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { createSubTodo, deleteSubTodo, updateSubTodo } from '../controllers/subtodo.controller.js'

const router = Router()
router.route('/create/:todoid').post(verifyJwt,createSubTodo)
router.route('/update/:todoid/:subtodoid').patch(verifyJwt,updateSubTodo)
router.route('/delete/:todoid/:subtodoid').delete(verifyJwt,deleteSubTodo)

export default router