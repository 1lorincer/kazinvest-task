import express from 'express'
import cors from 'cors'
import {errorMiddleware} from "./middleware/err.middleware.js";
import chatRoutes from "./routes/chat.routes.js";

export function createApp() {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.get("/", (req, res) => res.send("OK"));
    app.use("/api", chatRoutes);
    app.use(errorMiddleware);
    return app;
}