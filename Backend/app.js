import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors())
app.use(cookieParser())

import userRoutes from './src/routes/user.routes.js'
app.use('/user',userRoutes)

export {app}