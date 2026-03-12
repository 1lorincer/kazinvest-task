export function parseChatRequest(body) {
    const text = (body?.text ?? "").toString().trim();

    if (!text) {
        const err = new Error("Field 'text' is required");
        err.status = 400;
        throw err;
    }

    return {text};
}