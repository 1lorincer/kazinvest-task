import {createApp} from "./app.js";
import {env} from "./config/env.config.js";

const app = createApp()

app.listen(env.PORT, () => {
    console.log(`Server running: http://localhost:${env.PORT}`);
})