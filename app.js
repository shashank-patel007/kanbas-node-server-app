import express from 'express';
import "dotenv/config";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';
import UserRoutes from "./users/routes.js";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: "*"
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
sessionOptions.proxy = true;
sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
};
}
app.use(session(sessionOptions));  
app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
