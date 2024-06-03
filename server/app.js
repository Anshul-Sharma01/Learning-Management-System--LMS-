import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
import userRoutes from './routes/user.routes.js';
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}));

app.use(cookieParser());
app.use(morgan('dev'));
// morgan is a logger middleware for express js

app.use("/ping", (req, res) => {
    res.send("/pong");
});

app.use("/api/v1/user", userRoutes)


app.all('*', (req, res) => {
    res.status(404).send('OOPS !! 404 Page not found');
});

app.use(errorMiddleware);

export default app;

