import express, { urlencoded } from "express";
import router from "./routes/userRoutes.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config({
    path: './.env',
});

const app = express();

app.use(express.json());
app.use(urlencoded({extended : true}));

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));

app.use(router);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to db");
})
.catch((error) => {
    console.log("Error : " , error);
})

app.listen(process.env.PORT , () => console.log(`Listening on port ${process.env.PORT}`));