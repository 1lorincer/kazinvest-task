import "dotenv/config";

export const env = {
    PORT: process.env.PORT || 3000,
    GOOGLE_API_KEY: process.env.GEMINI_API_KEY || "",
};