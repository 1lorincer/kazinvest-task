import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import {errorMiddleware} from "./middleware/err.middleware.js";
import chatRoutes from "./routes/chat.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDist = path.join(__dirname, '..', 'client', 'dist')

export function createApp() {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use("/api", chatRoutes);
    app.use(express.static(clientDist))
    app.get('*splat', (req, res, next) => {
        res.sendFile(path.join(clientDist, 'index.html'), (err) => {
            if (err) next()
        })
    })
    app.use(errorMiddleware);
    return app;
}