import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors())

export {app}