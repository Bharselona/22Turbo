import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConfig.js";
import userRouter from "./routes/userRouter.js";
config({path : './.env'});

const app = express();

app.use(
        origin : [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods : ["GET","POST","PUT", "DELTE"],
        credentials : true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/api/user', userRouter);

dbConnection();

export default app;