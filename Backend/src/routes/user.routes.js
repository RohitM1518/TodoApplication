import {Router} from 'express'
import { createUser, login,logout } from '../controllers/user.controller.js'
import {verifyJwt} from '../middlewares/auth.middleware.js'
const router = Router()
router.route('/register').post(createUser)
router.route('/login').post(login)
router.route('/logout').get(verifyJwt,logout)


export default router
