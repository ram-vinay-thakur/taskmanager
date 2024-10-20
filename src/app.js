import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";
import MongoStore from 'connect-mongo';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

app.use(cors({
    origin: process.env.CORS_ORIGIN || ["http://localhost:3000"],
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Change to false to avoid empty sessions
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/mydb' }),
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: 'strict',
        httpOnly: true   
    },
}));

app.use(express.static("public"));

app.get('/example', (req, res) => {
    res.render('example', { title: 'My EJS Page', message: 'Hello, EJS!' });
});

import pagerouter from "./routes/page.route.js";
app.use('/', pagerouter)

import userRouter from "./routes/user.router.js";
app.use('/user', userRouter);

import taskrouter from "./routes/task.router.js";
app.use('/task', taskrouter);

export default app;
