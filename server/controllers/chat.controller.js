import {parseChatRequest} from "../models/chat.model.js";
import {generateReply} from "../service/chat.service.js";

export async function chatController(req, res, next) {
    try {
        const {text} = parseChatRequest(req.body)
        const reply = await generateReply(text);
        res.json({reply});
    } catch (e) {
        next(e)
    }
}