import {gemini} from "../config/ai.config.js";

export async function generateReply(text) {
    const resp = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
    });

    return resp.text ?? "";
}